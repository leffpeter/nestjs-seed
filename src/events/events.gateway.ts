import {Logger, UseGuards} from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {WsAuthGuard} from 'src/auth/ws-auth.guard';

// @WebSocketGateway({cors: true})
@WebSocketGateway(3031, {namespace: 'events', cors: true})
// @WebSocketGateway(3031, {path: '/events'})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(EventsGateway.name);

    // private readonly key = "events-clients";

    constructor(
    ) {}

    @WebSocketServer()
    server: Server;

    // clients: Socket[] = [];

    afterInit(server: any) {
        this.logger.log('init...');
        this.server.emit('events', {do: 'init'});
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        // this.clients.push(client);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        // this.clients = this.clients.filter(c => c !== client);
    }

    @SubscribeMessage('events')
    @UseGuards(WsAuthGuard)
    async handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
        this.logger.log(`message from client ${client.id}: ${data.name}`);
        client.emit('events', `pong to: ${data.name} at ${new Date}`);
    }

    // @SubscribeMessage('events')
    // onEvent(client: any, data: any): Observable<WsResponse<number>> {
    //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    // }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data;
    }

    notifyAll() {
        this.server.emit('events', 'an event ocurred...');
    }
}
