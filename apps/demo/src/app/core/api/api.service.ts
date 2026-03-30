import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type HttpOptions = {
  cache: RequestCache;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #http = inject(HttpClient);

  get<T>(url: string, options?: HttpOptions) {
    const { promise, resolve, reject } = Promise.withResolvers<T>();

    this.#http.get<T>(url, options).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });

    return promise;
  }

  post<V, R = unknown>(url: string, value?: V) {
    const { promise, resolve, reject } = Promise.withResolvers<R>();

    this.#http.post<R>(url, value).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });

    return promise;
  }

  put<V, R = unknown>(url: string, value: V) {
    const { promise, resolve, reject } = Promise.withResolvers<R>();

    this.#http.put<R>(url, value).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });

    return promise;
  }

  delete<T>(url: string) {
    const { promise, resolve, reject } = Promise.withResolvers<T>();

    this.#http.delete<T>(url).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });

    return promise;
  }
}
