const multer = require('multer');
const sharp = require('sharp');

// using memory storage (buffer)
const storage = multer.memoryStorage();

// Check if its an image. (must be an image)
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image!'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: multerFilter });

// Resize uploaded images
exports.resizeUploadedImages = async(req, res, next) => {
    if(req.files !== undefined && req.files.image) {
        // Set image file name
        req.body.image = `blogCover-${Date.now()}.jpeg`;
        try {
            await sharp(req.files.image[0].buffer)
                .resize(700, 700, { fit: sharp.fit.inside })
                .withMetadata()
                .jpeg({ quality: 95 })
                .toFile(`uploads/users/${req.body.image}`);
        } catch(err) {
            console.log(err)
        }
    }
    if(req.files === undefined) return next();
    if(req.files.images !== undefined && req.files.images) {
        req.body.images = [];
        try {
            await Promise.all(req.files.images.map(async(file, i) => {
                const fileName = `posts-${Date.now() + '-' + Math.round(Math.random() * 1E9)}.jpeg`;
                await sharp(file.buffer)
                    .resize(1920, 1080, { fit: sharp.fit.inside })
                    .withMetadata()
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/posts/${fileName}`);

                req.body.images.push(fileName);
                
            }))
        } catch(err) {
            console.log(err);
        }
    }
    next()
}

exports.uploadImages = upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'image', maxCount: 5 }
])