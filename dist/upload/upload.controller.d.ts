/// <reference types="multer" />
export declare class UploadController {
    uploadImage(file: Express.Multer.File): {
        originalname: string;
        filename: string;
        url: string;
    };
    seeUploadedFile(image: any, res: any): any;
}
