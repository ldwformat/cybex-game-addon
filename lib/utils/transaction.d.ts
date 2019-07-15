import { WsConnection } from "./connect";
export declare class Transaction {
    wsConnect: WsConnection;
    private options;
    ref_block_num: number;
    ref_block_prefix: number;
    expiration: number;
    operations: any[];
    signatures: any[];
    signer_private_keys: any[];
    tr_buffer: any;
    signed: boolean;
    db_api: (method: string, ...params: any[]) => Promise<any>;
    network_api: (method: string, ...params: any[]) => Promise<any>;
    constructor(wsConnect: WsConnection, options?: {
        expire_in_secs_proposal: number;
        review_in_secs_committee: number;
        expire_in_secs: number;
    });
    /**
     *   @arg {string} name - like "transfer"
     *   @arg {object} operation - JSON matchching the operation's format
     */
    add_type_operation(name: any, operation: any): void;
    /**
     *  This does it all: set fees, finalize, sign, and broadcast (if wanted).
     *
     *  @arg {ConfidentialWallet} cwallet - must be unlocked, used to gather signing keys
     *  @arg {array<string>} [signer_pubkeys = null] - Optional ["GPHAbc9Def0...", ...].  These are additional signing keys.  Some balance claims require propritary address formats, the witness node can't tell us which ones are needed so they must be passed in.  If the witness node can figure out a signing key (mostly all other transactions), it should not be passed in here.
     *  @arg {boolean} [broadcast = false]
     */
    process_transaction(cwallet: any, signer_pubkeys?: null, broadcast?: boolean): Promise<{}>;
    /** Typically this is called automatically just prior to signing.  Once finalized this transaction can not be changed. */
    finalize(): Promise<any>;
    /** @return {string} hex transaction ID */
    id(): string;
    /**
     * Typically one will use {@link this.add_type_operation} instead.
     * @arg {array} operation - [operation_id, operation]
     */
    add_operation(operation: any): void;
    get_type_operation(name: any, operation: any): any[];
    update_head_block(): Promise<void>;
    /** optional: there is a deafult expiration */
    set_expire_seconds(sec: number): number;
    propose(proposal_create_options: any): this;
    has_proposed_operation(): boolean;
    /** optional: the fees can be obtained from the witness node */
    set_required_fees(asset_id?: string): Promise<void>;
    get_potential_signatures(): Promise<{
        pubkeys: any;
        addys: any;
    }>;
    get_required_signatures(available_keys: any): Promise<any>;
    add_signer(private_key: any, public_key?: any): void;
    sign(): Promise<void>;
    serialize(): {};
    toObject(): {};
    broadcast(was_broadcast_callback?: any): Promise<void>;
    _broadcast(was_broadcast_callback: any): Promise<void>;
}
export default Transaction;
