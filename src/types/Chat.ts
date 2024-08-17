export type Message = {
    role: string;
    content: string;
    tool_call_id?: string;
};

export type ToolCall = {
    id: string;
    function: {
        name: string;
        arguments: string;
    };
};
