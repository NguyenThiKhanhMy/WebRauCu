import { Thang } from "./Enums";

export class String {
  static num = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  static date = (date: any) => {
    let newDate =
      new Date(date).getDate() +
      "/" +
      Thang[new Date(date).getMonth()] +
      "/" +
      new Date(date).getFullYear() +
      " lúc " +
      new Date(date).getHours() +
      ":" +
      new Date(date).getMinutes() +
      " " +
      (new Date(date).getHours() > 12 ? "tối" : "sáng");
    return newDate;
  };

  static stringL = (name: any) => {
    if(name.length >= 25){
      name = name.substring(0, 25) + "..."
    }
    return name
  }

  static day = (date: any)=> {
    let newDate =
      new Date(date).getDate() +
      "/" +
      Thang[new Date(date).getMonth()] +
      "/" +
      new Date(date).getFullYear()
    return newDate;
  };

  static time = (date: any) => {
    let newDate =
      new Date(date).getHours() +
      ":" +
      new Date(date).getMinutes() +
      " " +
      (new Date(date).getHours() > 12 ? "tối" : "sáng");
    return newDate;
  };

  static giaoAn = (ga: string) => {
    let newGa = ga.split(" ");
    if (newGa[0] == "Giáo" && newGa[1] == "án") {
      newGa.splice(0, 2);
      let temp = newGa[0].split("");
      temp[0] = temp[0].toUpperCase();
      newGa[0] = temp.join("");
      return newGa.join(" ");
    } else {
      return ga;
    }
  };

  static video = (link: any) =>  {
    let endPoint = link.split("=")[1];
    let newLink = "https://www.youtube.com/embed/" + endPoint
    return newLink
  }
  static video_endPoint = (link: any) =>  {
    let endPoint = link.split("=")[1];
    return endPoint
  }
  static fileUrl = (url: string) => {
    if(url){
      let proxy = url.split(":")
      if(proxy[0] == 'http' || proxy[0] == 'https'){
        return url
      }
      return process.env.ROOT_URL + url
    }
    return ""
  }

  static fileAdd = (url: string) => {
    // if(url){
    //   return url.split('\\').pop().split('/').pop();
    // }
    return ""
  }

  static DateTime = (date: any, string: any) => {
    if(string == "day"){
      return new Date(date).getDate();
    }
    if(string == "month"){
      return Thang[new Date(date).getMonth()]
    }
    if(string == "year"){
      return new Date(date).getFullYear()
    }
    if(string == "hour"){
      return new Date(date).getHours()
    }
    if(string == "minute"){
      new Date(date).getMinutes()
    }
    if(string == ""){
      return new Date()
    }
    return "";
  }; 
}
