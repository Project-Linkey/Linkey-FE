export const handleChangeFile = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImgFile: React.Dispatch<
    React.SetStateAction<{
      key: string;
      fileObject: string;
      file: File;
      fileName: string;
    } | null>
  >,
  setPreviewImg: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  let reader = new FileReader();
  const extension = e.target.value.split(".")[1];

  reader.onloadend = () => {
    if (
      extension === "png" ||
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "gif"
    ) {
      const base64 = reader.result;
      if (base64) {
        setPreviewImg(base64.toString());
      }
    }
  };

  if (e.target.files && e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);

    if (
      extension === "png" ||
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "gif"
    ) {
      const file = e.target.files[0];
      const fileObject = URL.createObjectURL(e.target.files[0]);
      const setUniqueKey =
        fileObject.split("/").pop() + "." + file.name.split(".").pop();

      setImgFile({
        key: setUniqueKey,
        fileObject: fileObject,
        file: file,
        fileName: file.name,
      });
    } else {
      alert("png, jpg 형식의 사진만 설정 하실 수 있습니다.");
      return;
    }
  }
};
