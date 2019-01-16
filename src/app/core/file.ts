import { load, Namespace, Service, Type } from "protobufjs";

export async function processProtoFile(filePath: string){
  const res = await load(filePath);
  
  console.log(res);
  const nested = res.nestedArray;

  for (const ns of nested) {
    if (ns instanceof Namespace) {
      console.log("Found namespace!", ns);

      if (ns.nestedArray) {
        const nNested = ns.nestedArray;

        for (const service of nNested) {
          if (service instanceof Service) {
            console.log("Found service", service.name);

            for (const method of service.methodsArray) {
              console.log("Found method", method.name);

              const reqType: Type = ns.get(method.requestType) as Type;
              const resType: Type = ns.get(method.responseType) as Type;

              console.log("...with types", reqType, resType);
            }
          }
        }
      }
    }
  }
}