export const EmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PasswordFormat = /^(?=.*\d)(?=.*[!@#$%^&*+-{}<>])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const NicFormat = /^([0-9]{9}[x|X|v|V]|(?:19|20)[0-9]{10})$/;
export const PhoneNoFormat = /^(?:7|0|(?:\+94))[0-9]{9}$/;

export const Error = "error";
export const Success = "success"
export const MsgError = "Error occurred!";
export const MsgSuccessful = "Successfully saved!";
export const MsgConverted = "Successfully converted!";
export const MsgFirstNameError  = "First name is required";
export const MsgLastNameError  = "Last name is required";
export const MsgUserNameError  = "Username is required";
export const MsgPhoneNull  = "Phone No. is required";
export const MsgEmailNull  = "Email is required";
export const MsgUniIdNull  = "University id is required";
export const MsgEmailFormatError = "Invalid email format.";
export const MsgPhoneNoFormatError = "Invalid phone No. format.";
export const MsgAcademicYearError = "Academic year is required.";
export const MsgMealPreference = "Meal preference is required";
export const MsgNicFormatError = "Invalid NIC format.";
export const MsgNicNullError = "Nic is required";
export const MsgPasswordFormatError = "Invalid password format.";
export const MsgPasswordNullError = "Password is required";
export const MsgConPasswordNullError = "Confirm password is required";
export const MsgConPasswordMatchError = "Confirm password is not match";
export const MsgCustomerNotFoundError = "Customer not found!";
export const MsgSignatureError = "Please provide a signature first.";

export const Wheel = "wheel";
export const SpareWheel = "spareWheel";
export const Vehicle = "vehicle";

export const OrderStatus = "Order";
export const InProgressStatus = "InProgress";