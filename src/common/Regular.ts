export class Regular {
  static email = (email: any) => {
    let pattern: any = new RegExp(
      "^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$"
    );
    return pattern.test(email);
  };

  static phoneVN = (phone: any) => {
    let pattern: any = new RegExp("([0-9]{9})");
    return pattern.test(phone);
  };

  static password = (pass: any) => {
    let pattern: any = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$"
    );
    return pattern.test(pass);
  };
}
