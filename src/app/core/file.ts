import { load, Namespace, Service, Type, Root} from "protobufjs";

interface IProtoMethod {
  name: string;
  requestTypeName: Type; 
  responseTypeName: Type; 
}

interface IProtoService {
  name: string;
  metohds: IProtoMethod[];
}

interface IProtoNamespace {
  name: string;
  services: IProtoService[];
}

export interface IProcessedProtoFile {
  filePath: string;
  namespaces: IProtoNamespace[];
}

export async function processProtoFile(filePath: string): Promise<IProcessedProtoFile | null> {
  let rootProtoObject: Root;
  try {
    rootProtoObject = await load(filePath);
  } catch (error) {
    console.error(error);
    return null;
  }
  
  const nested = rootProtoObject.nestedArray;

  const namespaces: IProtoNamespace[] = [];

  for (const ns of nested) {
    if (ns instanceof Namespace) {
      console.log("Found namespace!", ns);

      const protoNs: IProtoNamespace = {
        name: ns.name,
        services: [],
      };

      if (ns.nestedArray) {
        const nNested = ns.nestedArray;

        for (const service of nNested) {
          if (service instanceof Service) {
            console.log("Found service", service.name);

            const protoService: IProtoService = {
              name: service.name,
              metohds: []
            }
            for (const method of service.methodsArray) {
              console.log("Found method", method.name);

              const reqType = ns.get(method.requestType);
              const resType = ns.get(method.responseType);

              if (reqType instanceof Type && resType instanceof Type) {

                const protoMethod: IProtoMethod = {
                  name: method.name,
                  requestTypeName: reqType as Type,
                  responseTypeName: resType as Type
                }

                protoService.metohds.push(protoMethod);
              }
              console.log("...with types", reqType, resType);
            }

            protoNs.services.push(protoService);
          }
        }
      }
      namespaces.push(protoNs);
    }
  }

  console.log(JSON.stringify(namespaces, null, 2));
  const res: IProcessedProtoFile = {
    filePath,
    namespaces,
  }
  return res;
}