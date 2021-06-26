import * as rc from 'typed-rest-client/RestClient';

export const findAll = async (): Promise<Match> => {
    let response = await 
  
    if (!response) throw new Error("No match exists with that ID");
  
    return response;
  };

export const find = async (id: number): Promise<Match> => {
    let response = await prisma.matches.findUnique({ where: { id: id } });
  
    if (!response) throw new Error("No match exists with that ID");
  
    return response;
  };