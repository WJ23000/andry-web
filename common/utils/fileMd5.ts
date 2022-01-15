import SparkMD5 from "spark-md5";
import debounce from "@common/utils/debounce";

// 分片方法
const blobSlice =
  File.prototype.slice ||
  (File as any).prototype.mozSlice ||
  (File as any).prototype.webkitSlice;
class BMF {
  aborted = false;
  progress = 0;
  md5(file, md5Fn, progressFn?) {
    this.aborted = false;
    this.progress = 0;
    let currentChunk = 0;
    const chunkSize = 2097152;
    const chunks = Math.ceil(file.size / chunkSize);
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();

    function loadNext() {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;
      reader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    loadNext();

    reader.onloadend = (e: any) => {
      spark.append(e.target.result); // Append array buffer
      currentChunk++;
      this.progress = currentChunk / chunks;

      if (progressFn && typeof progressFn === "function") {
        progressFn(this.progress);
      }

      if (this.aborted) {
        md5Fn("aborted");
        return;
      }

      if (currentChunk < chunks) {
        loadNext();
      } else {
        md5Fn(null, spark.end());
      }
    };
  }

  abort() {
    this.aborted = true;
  }
}
let bmf: BMF | null = null;
// worker
let worker: Worker | null = null;
// clearWorker
const clearWorker = debounce(() => {
  worker && worker.terminate();
  worker = null;
}, 10000);

function getMd5BySpark(file: File | Blob): Promise<string> {
  !bmf && (bmf = new BMF());
  return new Promise((res, rej) => {
    bmf &&
      bmf.md5(file, (err, md5) => {
        if (err) {
          rej("");
          return;
        }
        res(md5);
      });
  });
}
export function iswebasm() {
  let useWasm = 0;
  const webAsmObj = window["WebAssembly"];
  if (typeof webAsmObj === "object") {
    if (typeof webAsmObj["Memory"] === "function") {
      if (
        typeof webAsmObj["instantiateStreaming"] === "function" ||
        typeof webAsmObj["instantiate"] === "function"
      )
        useWasm = 1;
    }
  }
  return useWasm;
}
function getMd5ByWasm(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function(res) {
        const obj = {
          data: this.result as any,
          type: "md5"
        };
        const { origin, pathname, hash } = window.location;
        const hashUrl = `${origin}${pathname}/wasm/worker.js`;
        const historyUrl = `${origin}/wasm/worker.js`;
        !worker && (worker = new Worker(hash ? hashUrl : historyUrl));
        worker.onmessage = function(ev) {
          if (ev.data.type == "error") {
            resolve(getMd5BySpark(file));
            return;
          }
          const md5Str = ev.data.data;
          clearWorker(worker);
          resolve(md5Str);
        };
        worker.onerror = e => {
          resolve(getMd5BySpark(file));
        };
        worker.postMessage(obj, [obj.data]);
      };
    } catch (e) {
      resolve(getMd5BySpark(file));
    }
  });
}
export function clearHistory() {
  bmf && bmf.abort();
}
export function getFileMd5(file: File | Blob): Promise<string> {
  return iswebasm() ? getMd5ByWasm(file) : getMd5BySpark(file);
}
