# 使用官方 Node.js 运行时镜像作为基础镜像
FROM cjie.eu.org/node

# 创建并设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm i pnpm
#
RUN pnpm i

# 复制项目的所有文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
