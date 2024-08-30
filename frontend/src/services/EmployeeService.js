const API_URL = '/api'; // バックエンドのエンドポイントに合わせて設定

export async function getEmployees() {
  const response = await fetch(`${API_URL}/employees`);
  const data = await response.json();
  return data;
}

export async function createEmployee(employee) {
  const formData = new FormData();
  formData.append('name', employee.name);
  formData.append('position', employee.position);
  if (employee.photo) {
    formData.append('photo', employee.photo);
  }

  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('従業員の作成に失敗しました');
  }
}