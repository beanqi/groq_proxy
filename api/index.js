module.exports = async (req, res) => {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  try {
    // 从环境变量中获取并随机选择一个API密钥
    const keys = process.env.TOGETHER_API_KEY.split(',');
    const randomKey = keys[Math.floor(Math.random() * keys.length)].trim();

    // 获取请求体(Vercel自动解析JSON请求体)
    const requestBody = req.body;
    
    // 修改请求参数
    requestBody.model = 'moonshotai/kimi-k2-instruct';
    requestBody.max_tokens = 30000;

    // 发送请求到Groq API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${randomKey}`,
        'Content-Type': 'application/json',
        'Accept': req.headers.accept,
        'User-Agent': req.headers['user-agent']
      },
      body: JSON.stringify(requestBody),
      redirect: 'follow'
    });

    // 获取响应数据
    const data = await response.json();
    
    // 返回响应
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: '请求处理失败', message: error.message });
  }
};
