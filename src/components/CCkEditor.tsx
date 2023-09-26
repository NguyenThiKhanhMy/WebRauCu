import React, { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "assets/css/suneditor.min.css";
import QuanLyAnhService from "services/QuanLyAnhService";
import { IResponseMessage } from "common/Models";

interface Props {
  key?: any;
  value: any;
  type?: string;
  size?: any;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange: Function;
  rows?: any;
}

const CCkEditor = (props: Props) => {
  const [content, setContent] = useState();
  useEffect(() => {
    var val:any = content;
    if(val == "<p><br></p>")
    {
      val = "";
    }
    handelChange(val)
  }, [content])
  const handelChange = (content: any) => {
    props.onChange(content);
  };
  const uploadToServer = async (files:any) => {
    let res:IResponseMessage = await QuanLyAnhService.UploadAnhEdtior(files);
    return res.Data;
  }
  const handleImageUploadBefore = async (files: any, info: any, uploadHandler: any) => {
    const src = await uploadToServer(files);
    const response = {
      "result": [
        {
          "url": src,
          "name": files[0].name,
          "size": files[0].size
        },
    ]}
    uploadHandler(response);
  }
  return (
    <>
      <SunEditor
        setContents={props.value}
        onChange={(content: any) => {
          setContent(content)
        }}
        onImageUploadBefore={handleImageUploadBefore}
        setOptions={{
          imageGalleryUrl: process.env.Image_Gallery_Url,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            "/", // Line break
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "video", "audio"],
            ["imageGallery"],
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["save", "template"],
          ],
          defaultTag: "",
          minHeight: "500px"
        }}
      />
    </>
  );
};

export default CCkEditor;
