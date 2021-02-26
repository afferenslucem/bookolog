import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cacheName: string;

  constructor() {
    // TODO: AF idealmente este cache name debería estar en configuración
    this.cacheName = 'ngsw:1:data:dynamic:bin-api-performance:cache';
  }

  clearAllCache(): Promise<void> {
    return this.clearCacheByNameOrAll(this.cacheName, false);
  }

  clearCache(baseUrl: string): void {
    this.clearCacheByUrl(this.cacheName, baseUrl);
  }

  /**
   * Elimina una cache en especifico o todas si se pasa como true el parametro allKeys
   * @param nameCache
   * @param allKeys
   */
  private async clearCacheByNameOrAll(nameCache: string, allKeys: boolean) {
    const keys = await caches.keys();

    if (allKeys) {
      await Promise.all(keys.map(item => caches.delete(item).then((res) => this.logDelete(res, item))));
    } else {
      await Promise.all(keys.filter(item => item == nameCache).map(item => caches.delete(item).then((res) => this.logDelete(res, item))));
    }
  }

  /**
   * Elimina una key(si encuentra la URL) dentro de una cache
   * @param nameCache
   * @param url
   */
  private clearCacheByUrl(nameCache: string, url: string) {
    caches.open(nameCache).then((c) => {
        c.keys().then((keys) => {
          keys.filter((p) => { return p.url.includes(url); })
            .map((keySearched) => c.delete(keySearched.url).then((res) => this.logDelete(res, keySearched)));
        });
      }
    );
  }

  private logDelete(result: boolean, cache: any) {
    console.log(`eliminado de cache para ${ cache } =>`, (result ? 'Satisfactorio' : 'Fallido'));
  }

}
