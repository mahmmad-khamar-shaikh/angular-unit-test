import { MessageService } from "./message.service";

describe('MessageService ', () => {
    let msgService: MessageService;
    beforeEach(() => {
        msgService = new MessageService();
    });
    it('should return no message to start ', () => {
        expect(msgService.messages.length).toBe(0);
    });
    it('should add message when add is called ', () => {
        msgService.add('adding first message ');
        expect(msgService.messages.length).toBe(1);
    });
    it('should clear all messages when clear is called ', () => {
        msgService.clear();
        expect(msgService.messages.length).toBe(0);
    });
});