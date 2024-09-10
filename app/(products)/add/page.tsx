"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import Textarea from "@/components/common/textarea";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");

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
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setPhotoId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("photo");
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

    const photoUrl = `https://imagedelivery.net/BeIKmnUeqh2uGk7c6NSanA/${photoId}`;
    formData.set("photo", photoUrl);
    return uploadProduct(formData);
  };

  const [state, dispatch] = useFormState(interceptAction, null);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-7 p-5">
        <div className="flex gap-5">
          <label
            htmlFor="photo"
            className="border-2 size-16 sm:size-20 aspect-square flex flex-col items-center justify-center 
          text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer p-2"
          >
            <PhotoIcon className="" />
          </label>
          {preview ? (
            <div
              className="bg-center bg-cover size-16 sm:size-20 rounded-md relative
              ring-[1px] ring-neutral-300"
              style={{
                backgroundImage: `url(${preview})`,
              }}
            >
              <div
                className="absolute bottom-0 bg-black opacity-70 w-16 h-6 sm:w-20 sm:h-8 rounded-b-md
              text-xs sm:text-sm flex justify-center items-center"
              >
                대표사진
              </div>
            </div>
          ) : (
            ""
          )}
          <input
            onChange={onImageChange}
            type="file"
            id="photo"
            name="photo"
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-neutral-200">제목</div>
          <Input
            name="title"
            type="text"
            required
            placeholder="제목"
            errors={state?.fieldErrors.title}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-neutral-200">가격</div>
          <Input
            name="price"
            type="number"
            required
            placeholder="₩ 가격을 입력해주세요"
            errors={state?.fieldErrors.price}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-neutral-200">자세한 설명</div>
          <Textarea
            name="description"
            required
            placeholder="자세한 설명"
            errors={state?.fieldErrors.description}
          />
        </div>
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
