import config from "@/lib/config";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { urlEndpoint, publicKey, privateKey },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw Error(`ImageKit Authentication Failed :${error}`);
  }
};

interface ImageUploadParams {
  value: any;
  onFileChange: (filePath: string) => string;
}

export default function ImageUpload({
  value,
  onFileChange,
}: ImageUploadParams) {
  const ikUploadRef = useRef(null);
  const { toast } = useToast();

  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const onSucess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image Uploaded Sucessfully.",
      description: `${res.filePath} uploaded sucessfully.`,
    });
  };
  const onError = (error: any) => {
    console.log(`failed in the imageupload: ${error}`);

    toast({
      title: "Image Uploaded Failed.",
      description: `Your image couldn't be uploaded, Please try again.`,
      variant: "destructive",
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSucess}
        fileName="test-upload.png"
        className="hidden"
      />
      <button
        className={cn("upload-btn")}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={"icons/upload.svg"}
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file.filePath && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
}
