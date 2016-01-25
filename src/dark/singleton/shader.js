//著色器組件
dark.shader = {};
//返回 指定 著色器
dark.shader._shaders = {};
//返回 變灰 著色器
dark.shader.get_gray_shaders = function(){
	var shader = dark.shader._shaders["gray"];
	if(shader != undefined){
		return shader;
	}

	var shader = new cc.GLProgram();
	shader.retain();	//jsb需要retain一下，否則會被回收
	if(!shader.initWithString(dark.shader.SHADERS_DEFAULT, dark.shader.SHADERS_GRAY)){
		return null;
	}
	shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);  
	shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR); 
	shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS); 

	shader.link();
	shader.updateUniforms();

	dark.shader._shaders["gray"] = shader;
	return shader;
};



/*定義著色器程序*/
if(101 == cc.sys.platform){	
	dark.shader.SHADERS_DEFAULT = "attribute vec4 a_position;	\n" +
	"attribute vec2 a_texCoord;	\n" +
	"attribute vec4 a_color;	\n" +
	"varying vec4 v_fragmentColor;	\n" +
	"varying vec2 v_texCoord;	\n" +
	"void main(){	\n" +
	"gl_Position = CC_PMatrix * CC_MVMatrix  * a_position;	\n" + 
	"v_fragmentColor = a_color;	\n" + 
	"v_texCoord = a_texCoord;}";
}else{
	dark.shader.SHADERS_DEFAULT = "attribute vec4 a_position;	\n" +
	"attribute vec2 a_texCoord;	\n" +
	"attribute vec4 a_color;	\n" +
	"varying vec4 v_fragmentColor;	\n" +
	"varying vec2 v_texCoord;	\n" +
	"void main(){	\n" +
	"gl_Position = CC_PMatrix * a_position;	\n" + 
	"v_fragmentColor = a_color;	\n" + 
	"v_texCoord = a_texCoord;}";
}

//變灰 著色器
dark.shader.SHADERS_GRAY = "varying vec4 v_fragmentColor;	\n" +
"varying vec2 v_texCoord;	\n" +
"void main(){	\n" +
"vec4 c = texture2D(CC_Texture0, v_texCoord);	\n" +
"gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);	\n" +
"gl_FragColor.w = c.w;}";