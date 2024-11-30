import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { Transform } from 'stream';
import dotenv from 'dotenv';
import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";

dotenv.config();

const accessKeyId = process.env.AWS_PUBLIC_KEY;
const secretAccessKey = process.env.AWS_PRIVATE_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

const parseFormAndUploadFiles = async (req) => {
  return new Promise((resolve, reject) => {
    let options = {
      maxFileSize: 10 * 1024 * 1024, // 10 MBs converted to bytes
      allowEmptyFiles: false,
      keepExtensions: true
    };

    const form = formidable(options);

    const status = {
      end: false,
      files: {},
      image: null,
      fields: {}
    }

    const checkResolve = () => {
      if (status.end && Array.from(Object.values(status.files)).every(success => success)) {
        resolve({ image: status.image, fields: firstValues(form, status.fields) });
      }
    }

    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      status.end = true;
      status.fields = fields;
      checkResolve();
    });

    form.on('error', error => {
      reject(error.message);
    });

    form.on('data', data => {
      if (data.name === "successUpload") {
        if (data.value.formName === "image") {
          status.image = data.value.data;
        }
        status.files[data.value.formName] = true;
        checkResolve();
      }
    });

    form.on('fileBegin', (formName, file) => {
      status.files[formName] = false;

      file.open = async function() {
        this._writeStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk);
          }
        });

        this._writeStream.on('error', e => {
          form.emit('error', e)
        });

        // Upload to S3
        new Upload({
          client: new S3Client({
              credentials: {
                  accessKeyId,
                  secretAccessKey
              },
              region
          }),
          params: {
            // ACL: 'public-read',
            Bucket,
            Key: this.originalFilename,
            Body: this._writeStream,
            ContentType: file.mimetype
          },
          tags: [],
          queueSize: 4, // Optional concurrency configuration
          partSize: 1024 * 1024 * 5, // Optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // Optional manually handle dropped parts
        }).done().then(data => {
          form.emit('data', { name: "successUpload", value: { formName, data }});
        }).catch((err) => {
          form.emit('error', err);
        });
      }
    });
  });
}

export default parseFormAndUploadFiles;