import { Server } from 'socket.io'
import AWS from 'aws-sdk';
import S3Client  from 'aws-sdk/clients/s3';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

export const S3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: region,
  Bucket: Bucket
});

export default async function handler(req, res) {
   let {  base64, filename } = req.body;
    const base64String = base64.replace(/^data:image\/\w+;base64,/, "");
	const buff = new Buffer(base64String,'base64');
    

   var data = {
        Bucket: Bucket,
		Key: `${filename}`,
        ContentEncoding: 'base64',
        ContentType: 'image/png',
		Body: buff,
        ACL: "public-read",
	}

  return S3.putObject(data, function(err, data){
      if (err) { 
        console.log(err);
        console.log('Error uploading data: ', data); 
      } else {
        console.log('successfully uploaded the image!');
       return res.status(200).json(data);
      }
  });
}
