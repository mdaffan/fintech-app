import { baseAxios } from '@/api/axios'
interface Req {
  url?: string
  query?: any
  attribute?: string
  headers?: any
  body?: any
  id?: string | number
}
export default class BaseService {
  url = ''
  baseURL: string | null = ''
  constructor(url: string, baseURL = null) {
    this.url = url
    this.baseURL = baseURL
  }

  async getAll(req: Req = {}) {
    return baseAxios({
      url: `${req.url || this.url}/${req.attribute ? `${req.attribute}` : ''}`,
      ...(req.query && { params: req.query }),
      ...(this.baseURL && { baseURL: this.baseURL }),
      ...(req.headers && { headers: req.headers }),
    })
  }
  async post(req: Req = {}) {
    return baseAxios({
      url: `${req.url || this.url}/${req.id ? `${req.id}/` : ''}${
        req.attribute ? `${req.attribute}/` : ''
      }`,
      method: 'post',
      data: req.body,
      ...(req.query && { params: req.query }),
      ...(this.baseURL && { baseURL: this.baseURL }),
      ...(req.headers && { headers: req.headers }),
    })
  }
  async get(req: Req = {}) {
    return baseAxios({
      url: `${req.url || this.url}/${req.id}/${
        req.attribute ? `${req.attribute}` : ''
      }`,
      ...(req.query && { params: req.query }),
      ...(this.baseURL && { baseURL: this.baseURL }),
      ...(req.headers && { headers: req.headers }),
    })
  }
  async put(req: Req = {}) {
    return baseAxios({
      url: `${req.url || this.url}/${req.id ? `${req.id}/` : ''}${
        req.attribute ? `${req.attribute}/` : ''
      }`,
      method: 'put',
      data: req.body,
      ...(this.baseURL && { baseURL: this.baseURL }),
      ...(req.headers && { headers: req.headers }),
    })
  }
  async patch(req: Req = {}) {
    return baseAxios({
      url: `${req.url || this.url}${req.id ? `/${req.id}` : ''}${
        req.attribute ? `/${req.attribute}` : ''
      }`,
      ...(req.query && { params: req.query }),
      method: 'patch',
      data: req.body,
      ...(req.headers && { headers: req.headers }),
      ...(this.baseURL && { baseURL: this.baseURL }),
    })
  }
  async delete(req: Req = {}) {
    return baseAxios({
      url: `${req.url || this.url}${req.id ? `/${req.id}` : ''}${
        req.attribute ? `/${req.attribute}` : ''
      }`,
      method: 'delete',
      data: req.body,
      ...(req.query && { params: req.query }),
      ...(req.headers && { headers: req.headers }),
      ...(this.baseURL && { baseURL: this.baseURL }),
    })
  }
}
