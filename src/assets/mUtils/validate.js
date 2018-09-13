/**
 * Created by yubh on 2018/3/27.
 */
//电话校验
function isValidPhone(str) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(str);
};

// 身份证校验
function isValidIdCard(val) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val);
};

//验证帐号是否合法
//验证规则：字母、数字、下划线组成，字母开头，4-16位。
const checkAccount = str => {
  const re = /^[a-zA-z]\w{3,15}$/;
  return re.test(str);
};


export const validPhone = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (!isValidPhone(value)) {
      callback(new Error('请输入正确的11位手机号码'));
    } else {
      callback();
    }
  }
};

export const validIdCard = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (!isValidIdCard(value)) {
      callback(new Error('请输入正确的身份证号码'));
    } else {
      callback();
    }
  }
};


export const validateAccount = (rule, value, callback) => {
  console.log("value:::::", value)
  if (value === '') {
    callback(new Error('请输入账号'));
  } else {
    if (!(checkAccount(value))) {
      callback(new Error('请输入正确格式的账号'))
    }
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  }
  callback();
};

export const validHeight = (rule, value, callback) => {
  if (+value >= 0) {
    callback();
  } else {
    callback(new Error('请输入正确身高信息'))
  }
};

export const validWeight = (rule, value, callback) => {
  if (+value >= 0) {
    callback();
  } else {
    callback(new Error('请输入正确体重信息'))
  }
};

export const validPrice = (rule, value, callback) => {
  if (+value >= 0) {
    callback();
  } else {
    callback(new Error('请输入正确的服务价格'))
  }
};
