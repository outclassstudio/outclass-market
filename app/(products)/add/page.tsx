"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
// import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductType } from "./schema";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  // const [photoId, setPhotoId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      // setPhotoId(id);
      setValue(
        "photo",
        `https://imagedelivery.net/BeIKmnUeqh2uGk7c6NSanA/${id}`
      );
    }
  };

  const interceptAction = handleSubmit(async (data: ProductType) => {
    // const file = formData.get("photo");
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    // const photoUrl = `https://imagedelivery.net/BeIKmnUeqh2uGk7c6NSanA/${photoId}`;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price + "");
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    // formData.set("photo", photoUrl);
    return uploadProduct(formData);
  });
  // const [state, dispatch] = useFormState(interceptAction, null);
  const onValid = async () => {
    await interceptAction();
  };

  return (
    <div>
      <form
        //  action={dispatch}
        action={onValid}
        className="flex flex-col gap-5 p-5"
      >
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex flex-col items-center justify-center 
          text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer
          bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview ? null : (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm r">
                사진을 추가해주세요
                {errors.photo?.message ?? ""}
              </div>
            </>
          )}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input
          // name="title"
          type="text"
          required
          placeholder="제목"
          {...register("title")}
          // errors={state?.fieldErrors.title}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          // name="price"
          type="number"
          required
          placeholder="가격"
          {...register("price")}
          // errors={state?.fieldErrors.price}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          // name="description"
          type="text"
          required
          placeholder="제품 설명"
          {...register("description")}
          // errors={state?.fieldErrors.description}
          errors={[errors.description?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
