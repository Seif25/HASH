import { Server as NextServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/app/lib/types/io.types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler: (req: NextApiRequest, res: NextApiResponseServerIo) => void = (
  req,
  res
) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NextServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
