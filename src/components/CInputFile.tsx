import React, { useEffect, useState } from 'react'
import CButton from './CButton';
interface Props {
    key?: any,
    id: any,
    multiple:any,
    value:any,
    onChange: any,
    disabled: any
}
export interface IInputFile {
    Id: any,
    Name: any,
    Url: any    
}
const { v4: uuidv4 } = require('uuid');
const CInputFile = (props: Props) => {      
    const [fileList, setFileList] = useState<any>([]);
    useEffect(() => {             
        setFileList(props.value)
    }, [])
    useEffect(() => {             
        setFileList(props.value)
    }, [props.value])        
    const SelectFile = () => {
        let e:any = document.getElementById(props.id + "");
        e.click();
    }
    const RemoveFile = (id:any) => {
        let files:any = [...fileList];
        for(let i = 0;i < fileList.length;i++)
        {
            if(fileList[i].Id == id)
            {
                files.splice(i, 1);
                break;
            }            
        }
        props.onChange(files);
        setFileList(files);
    }
    const PreviewFile = (url:any) => {   
        if(typeof url == "string")
        {                     
            window.open(process.env.ROOT_URL + url,'_blank');
        }
        if(typeof url == "object")
        {
            window.open(URL.createObjectURL(url),'_blank');
        }
        return false;
    }
    const FileListRender = () => {
        let btnHtml:any = []
        if(fileList)
        {                               
            for(let i = 0;i < fileList.length;i++)
            {
                btnHtml.push(
                    <div key={i} data-id={fileList[i].Id} className="alert file-list border-primary fade show" >
                        <a onClick={() => { PreviewFile(fileList[i].Url); }}>{fileList[i].Name}</a>
                        <button type="button" className="btn-close" onClick={() => {RemoveFile(fileList[i].Id)}}></button>
                    </div>
                )
            }
        }
        return btnHtml;
    }
    const onChange = (e:any) => {                     
        var splitPath = e.target.value.split("\\");        
        let file:IInputFile = {Id: uuidv4(), Name: splitPath[splitPath.length - 1], Url: e.target.files[0]};                
        let files:any = [];
        if(props.multiple && fileList)
        {            
            files = [...fileList];            
        }        
        files.push(file)
        props.onChange(files);
        setFileList(files);     
    }
    return (
        <>
            <input type="file" id={props.id} style={{display:"none"}} onChange={(e:any) => {onChange(e)}} />
            {props.disabled == true ? <></>:<CButton title="Tải file lên" onClick={() => {SelectFile()}}></CButton>}
            {FileListRender()}
        </>
    )
}

export default CInputFile;