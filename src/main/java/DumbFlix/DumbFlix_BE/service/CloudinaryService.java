package DumbFlix.DumbFlix_BE.service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import DumbFlix.DumbFlix_BE.dto.response.CloudinaryResponse;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @SuppressWarnings("unchecked")
    public CloudinaryResponse uploadImage(MultipartFile image, String fileName) {
        String randomName = UUID.randomUUID().toString();
        try {
            Map<String, Object> uploadParams = Map.of(
                    "folder", "DumbFlix/" + fileName,
                    "public_id", randomName,
                    "resource_type", "image"
            );

            final Map<String, Object> result = this.cloudinary.uploader().upload(image.getBytes(), uploadParams);

            final String url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");

            return CloudinaryResponse.builder().public_id(publicId).url(url).build();
        } catch (Exception e) {
            e.printStackTrace(); 
            throw new FuncErrorException("Failed to upload file");
        }
    }

    @SuppressWarnings("unchecked")
    public CloudinaryResponse uploadThumbnail(MultipartFile thumbnail, String fileName) {
        try {
            String randomName = UUID.randomUUID().toString();
            Map<String, Object> uploadParams = ObjectUtils.asMap(
                    "folder", "DumbFlix/" + fileName,
                    "public_id", randomName,
                    "resource_type", "image");

            final Map<String, Object> result = (Map<String, Object>) this.cloudinary.uploader()
                    .upload(thumbnail.getBytes(), uploadParams);

            final String url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");

            return CloudinaryResponse.builder().public_id(publicId).url(url).build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new FuncErrorException("Failed to upload file");
        }
    }

    @SuppressWarnings("unchecked")
    public CloudinaryResponse uploadVideo(MultipartFile video) {
        try {
            String timestamp = String.valueOf(System.currentTimeMillis());

            Map<String, Object> uploadParams = ObjectUtils.asMap(
                    "resource_type", "video",
                    "public_id", "DumbFlix/Videos/" + timestamp,
                    "folder", "DumbFlix");

            Map<String, Object> result = this.cloudinary.uploader().upload(video.getBytes(), uploadParams);

            final String url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");

            return new CloudinaryResponse().builder().public_id(publicId).url(url).build();

        } catch (IOException e) {
            throw new RuntimeException("Gagal upload video");
        }
    }
}
