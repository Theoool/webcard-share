export async function safeFetch(url, options:any = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8秒超时

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'X-Forwarded-For': options.headers?.['x-real-ip'] || ''
      },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error:any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
