package com.hamtalk.common.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Uploader {
    // S3 이미지 업로드 관련 로직 모아둔 클래스
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    /**
     * S3에 파일 업로드
     * @param file 업로드할 MultipartFile
     * @param dirName S3 내 저장될 디렉토리 이름 (예: "profile", "chat")
     * @return 업로드된 이미지의 S3 URL
     **/

    public String upload(MultipartFile file, String dirName, Long userId) throws IOException {
        String fileName = createFileName(dirName, file.getOriginalFilename(), userId);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        amazonS3.putObject(bucket, fileName, file.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    // S3에 저장할 파일명 생성: 디렉토리/UUID.확장자
    private String createFileName(String dirName, String originalFilename, Long userId) {
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        return dirName + "/" + userId + "_" + uuid + ext;


    }



}
