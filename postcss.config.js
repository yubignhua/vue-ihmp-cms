/**
 * Created by yubh on 2018/5/10.
 */
module.exports = ({ file, options, env })=>{
  if(env === 'production'){
    return {
      plugins: [
        require('autoprefixer'),
        require('cssnano'),
      ]
    }
  }else{
    return{
      plugins: [
        require('autoprefixer'),
        //require('cssnano'),
      ]
    }
  }
}
