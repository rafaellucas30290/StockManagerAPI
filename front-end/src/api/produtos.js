const BASE_URL = '/produtos'

export async function getAllProducts() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Erro ao buscar produtos')
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Produto não encontrado')
  return res.json()
}

export async function createProduct(product) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || 'Erro ao criar produto')
  }
  return res.json()
}

export async function updateProduct(product) {
  const res = await fetch(BASE_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || 'Erro ao atualizar produto')
  }
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao deletar produto')
}
