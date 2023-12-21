## Usage Instructions
1) Clone this repository
```git clone https://github.com/KelfinTDetonator/Arts-Gallery.git```
2) Create your .env in local repository (or you can see an example in env.sample file)
```
PORT=
DATABASE_URL=
KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_SECRET_KEY=
IMAGEKIT_URL_ENDPOINT=    
```  
3) ```npm install``` to install all packages provided in the package.json  
4) ```npx prisma migrate dev``` or  ```npx prisma db push``` to migrate your database from prisma.schema  
5) Update your .gitignore  
```
node_modules
.env
README.md
```

## Showcase :tv: 
:black_medium_square: Success uploaded an image  
![Screenshot (1552)](https://github.com/KelfinTDetonator/Arts-Gallery/assets/91953273/5c2bbde9-de2d-4480-9c8c-049624f828f1)  
:black_medium_square: Error when upload an image (tst.png is actually a text file)  
![Screenshot (1554)](https://github.com/KelfinTDetonator/Arts-Gallery/assets/91953273/a0feaca2-d30e-486d-9e39-fb1ea9290ca3)  
:black_medium_square: Upload an image into imageKit resources  
![Screenshot (1555)](https://github.com/KelfinTDetonator/Arts-Gallery/assets/91953273/2a0723d7-acac-41f6-8e7c-a6f4df6d5a3a)  

## Features :rocket:
:black_medium_square: Authenticated user can upload an image      
:black_medium_square: Login/register with JWT    

## Technologies Used :hammer:
:black_medium_square: Express JS  
:black_medium_square: ImageKit  
:black_medium_square: Multer 
:black_medium_square: Prisma ORM for PostgreSQL  
:black_medium_square: JWT Authentication  

## What I learned :computer:
:black_medium_square: Learn how to effectively handle image upload with imageKit and Multer
:black_medium_square: Validate an image not only by its MIME type, but including its file content
:black_medium_square: Handle image file upload limits
:black_medium_square: Using Express static to provide an image that have uploaded successfully used Multer
