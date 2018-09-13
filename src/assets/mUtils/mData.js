// 服务提供方类型
function getServiceProviderType() {
  return [
    {value: 0, verbose: '请选择'},
    {value: 5, verbose: '医生'},
    {value: 10, verbose: '文章'}
  ]
}

// 快速搜索类型
function getSearchType() {
  return [
    {value: 5, verbose: '会员编号'},
    {value: 15, verbose: '微信昵称'}
  ]
}

// 用户快速搜索类型
function getStaffSearch() {
  return [
    {value: 10, verbose: 'LDAP账号'},
    {value: 30, verbose: '员工姓名'}
  ]
}

// 创建任务用户搜索类型
function getTaskUserType() {
  return [
    {value: 5, verbose: '会员编号'},
    {value: 15, verbose: '微信昵称'},
    {value: 20, verbose: '微信号'}
  ]
}

// 创建用户唯一性校验类型
function getCheckUserType() {
  return [
    {value: 20, verbose: '微信号'},
    {value: 25, verbose: '手机号'}
  ]
}

// 任务状态
function getServiceStatus() {
  return [
    {value: 5, verbose: '待处理'},
    {value: 10, verbose: '已完成'},
    {value: 15, verbose: '已终止'}
  ]
}

// 会员tag
function getVipTag() {
  return [
    {value: 0, verbose: '非会员'},
    {value: 1, verbose: '未享受权益会员'},
    {value: 2, verbose: '已享受权益会员'}
  ]
}

// 是否会员
function getVipType() {
  return [
    {value: 'all', verbose: '两者都有'},
    {value: 'vip', verbose: '是'},
    {value: 'not_vip', verbose: '否'}
  ]
}

// 服务记录数排序方式
function serviceSortType() {
  return [
    {value: 0, verbose: '不排序'},
    {value: 1, verbose: '从小到大排序'},
    {value: -1, verbose: '从大到小排序'}
  ]
}

// 民族
function getNation() {
  return [
    {value: '汉族', verbose: '汉族'},
    {value: '壮族', verbose: '壮族'},
    {value: '满族', verbose: '满族'},
    {value: '回族', verbose: '回族'},
    {value: '苗族', verbose: '苗族'},
    {value: '维吾尔族', verbose: '维吾尔族'},
    {value: '土家族', verbose: '土家族'},
    {value: '彝族', verbose: '彝族'},
    {value: '蒙古族', verbose: '蒙古族'},
    {value: '藏族', verbose: '藏族'},
    {value: '布依族', verbose: '布依族'},
    {value: '侗族', verbose: '侗族'},
    {value: '瑶族', verbose: '瑶族'},
    {value: '朝鲜族', verbose: '朝鲜族'},
    {value: '白族', verbose: '白族'},
    {value: '哈尼族', verbose: '哈尼族'},
    {value: '哈萨克族', verbose: '哈萨克族'},
    {value: '黎族', verbose: '黎族'},
    {value: '傣族', verbose: '傣族'},
    {value: '畬族', verbose: '畬族'},
    {value: '傈僳族', verbose: '傈僳族'},
    {value: '仡佬族', verbose: '仡佬族'},
    {value: '东乡族', verbose: '东乡族'},
    {value: '高山族', verbose: '高山族'},
    {value: '拉枯族', verbose: '拉枯族'},
    {value: '水族', verbose: '水族'},
    {value: '佤族', verbose: '佤族'},
    {value: '纳西族', verbose: '纳西族'},
    {value: '羌族', verbose: '羌族'},
    {value: '土族', verbose: '土族'},
    {value: '仫佬族', verbose: '仫佬族'},
    {value: '锡伯族', verbose: '锡伯族'},
    {value: '柯尔克孜族', verbose: '柯尔克孜族'},
    {value: '达翰尔族', verbose: '达翰尔族'},
    {value: '景颇族', verbose: '景颇族'},
    {value: '毛南族', verbose: '毛南族'},
    {value: '撒拉族', verbose: '撒拉族'},
    {value: '布朗族', verbose: '布朗族'},
    {value: '塔吉克族', verbose: '塔吉克族'},
    {value: '阿昌族', verbose: '阿昌族'},
    {value: '普米族', verbose: '普米族'},
    {value: '鄂温克族', verbose: '鄂温克族'},
    {value: '怒族', verbose: '怒族'},
    {value: '京族', verbose: '京族'},
    {value: '基诺族', verbose: '基诺族'},
    {value: '德昂族', verbose: '德昂族'},
    {value: '保安族', verbose: '保安族'},
    {value: '俄罗斯族', verbose: '俄罗斯族'},
    {value: '裕固族', verbose: '裕固族'},
    {value: '乌孜别克族', verbose: '乌孜别克族'},
    {value: '门巴族', verbose: '门巴族'},
    {value: '鄂伦春族', verbose: '鄂伦春族'},
    {value: '独龙族', verbose: '独龙族'},
    {value: '塔塔尔族', verbose: '塔塔尔族'},
    {value: '赫哲族', verbose: '赫哲族'},
    {value: '珞巴族', verbose: '珞巴族'}
  ]
}

// 性别
function getSexList() {
  return [
    {value: 'm', verbose: '男'},
    {value: 'f', verbose: '女'}
  ]
}

module.exports = {
  getSearchType: getSearchType(),
  getStaffSearch: getStaffSearch(),
  getCheckUserType: getCheckUserType(),
  getTaskUserType: getTaskUserType(),
  getServiceProviderType: getServiceProviderType(),
  getServiceStatus: getServiceStatus(),
  getVipTag: getVipTag(),
  getVipType: getVipType(),
  serviceSortType: serviceSortType(),
  getNation: getNation(),
  getSexList: getSexList()
};
