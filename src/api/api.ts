import server from "@/utils/request";

let token = localStorage.token;
const http = {
  // 删除标签
  async del_label(id:number){
    return await server.httpObj.delete('api/del_tag', { id } )
  },
  // 查询所有标签
  async all_label(){
    let time = new Date().getTime();
    return await server.httpObj.get(`/api/all_label?t=${time} `).then()
  },
  // 文章
  async home_article() {
    return await server.httpObj.get("/api/home/article").then();
  },
  // 主页信息
  async home_info() {
    return await server.httpObj.get("/api/home/info").then();
  },
  // 主页导航栏
  async home_nav() {
    return await server.httpObj.get("/api/home/nav").then();
  },
  // 登录
  async login_info(val: object) {
    return await server.httpObj.post("/api/login", val).then();
  },
  // 查询用户信息
  async My_Info() {
    return await server.httpObj
      .get("/api/My_info", { headers: { token: token } })
      .then();
  },
  // 查询文章（后台接口，必须要登录！）
  async query_articles() {
    return await server.httpObj.get("/api/query_articles", {
      headers: { token: token },
    });
  },

  // 通过文章id查询文章内容
  async Select_article(article_id: number) {
    return await server.httpObj.post("/api/select_article", { article_id });
  },
  // 发布文章
  async Save_Article(val: any) {
    return await server.httpObj
      .post("/api/article", val, { headers: { token: token } })
      .then();
  },
  //查询所有文件
  async qyrey_File() {
    return await server.httpObj
      .get("/api/file", { headers: { token: token } })
      .then();
  },
  //通过id删除文章
  async Delet_article(id: String) {
    return await server.httpObj.delete("api/del_article", {
      id: id,
      token: token,
    });
  },

  //通过标签名字查询文章id
  async Tags(Tags_content: string) {
    return await server.httpObj.post("api/tags", { tag_name: Tags_content });
  },
  // 查询所有标签和文章数量
  async article_Num() {
    return await server.httpObj
      .get("api/tags")
      .then()
      .catch((err) => console.log(err));
  },
  //更新文章
  async update_article(data: any) {
    return await server.httpObj.post("api/update_article", data).then();
  },
  //  更新个人信息
  async update_User(data: any) {
    return await server.httpObj.post("api/update_User", data).then();
  },
  async add_tag(data:any){
    return await server.httpObj.post('/api/add_tags',data).then().catch(e => console.log(e))
  }

};
export default http;
