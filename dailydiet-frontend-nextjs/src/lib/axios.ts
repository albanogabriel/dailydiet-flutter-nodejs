import axios from "axios"
import Cookies from "js-cookie"

const baseURL = process.env.NEXT_PUBLIC_API_URL

// CREATE AXIOS INSTANCE
export const clientAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// INTERCEPT REQUEST
clientAxios.interceptors.request.use(
  async (config) => {
    if (config.url === "/login" || config.url === "/signup") {
      return config
    }

    const accessToken = Cookies.get("token")

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

// interceptors.request.use: Este método permite interceptar requisições antes de serem enviadas. Ele recebe dois parâmetros: um callback para quando a requisição é bem-sucedida e outro para lidar com erros.
// Verificação da URL: Se a requisição for para as rotas /login ou /signup, o código simplesmente retorna a configuração da requisição (config) sem modificações. Isso é feito para evitar adicionar um token de autenticação em requisições que não precisam dele.
// Acessando o Token: O código tenta obter um token de acesso dos cookies usando Cookies.get('token').
// Adicionando o Token no Cabeçalho: Se o token estiver disponível, ele é adicionado ao cabeçalho da requisição com o formato Authorization: Bearer <token>. Isso é comum em APIs que usam autenticação baseada em tokens.
// Tratamento de Erros: Se ocorrer um erro ao preparar a requisição, o erro é rejeitado, o que pode ser tratado em outro lugar do código.

// INTERCEPT RESPONSE
clientAxios.interceptors.response.use(
  (response) => {
    return response
  },
  // async (error) => {
  //   const originalRequest = error.config
  //   console.log(error)

  //   if (error.response.status === 401 && !originalRequest._retry) {
  //     originalRequest._retry = true
  //     Cookies.remove("accessToken")

  //     localStorage.removeItem("userId")
  //     localStorage.removeItem("userName")
  //     localStorage.removeItem("userEmail")
  //     localStorage.removeItem("userImage")
  //     localStorage.setItem(
  //       "TempLoginMessage",
  //       "Seu login está sendo usado por outro dispositivo, faça o login novamente!",
  //     )

  //     window.location.replace("/login")
  //   }

  //   return Promise.reject(error)
  // },
)

// interceptors.response.use: Similar ao interceptor de requisição, este permite interceptar respostas antes que sejam processadas.
// Resposta Bem-Sucedida: Se a resposta for bem-sucedida, ela é retornada sem modificações.
// Tratamento de Erros:
// 401 Unauthorized: Se o erro de resposta tiver um status de 401 (não autorizado) e a requisição original não foi tentada novamente (!originalRequest._retry), o código:
// Marca a requisição original como já tendo sido tentada (originalRequest._retry = true).
// Remove o token de acesso dos cookies.
// Remove informações do usuário do localStorage, como userId, userName, userEmail e userImage.
// Armazena uma mensagem temporária no localStorage para informar que o login está sendo usado em outro dispositivo.
// Redireciona o usuário para a página de login (window.location.replace('/login')).
// Rejeitando Erros: Se houver qualquer erro que não seja 401, ele é rejeitado, permitindo que outros componentes do aplicativo lidem com o erro.
