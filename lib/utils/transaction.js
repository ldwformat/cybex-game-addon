var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import assert from "assert";
import { Signature, PublicKey, hash } from "../cybex/ecc";
import { ops } from "../cybex/serializer";
import ChainTypes from "../cybex/chain/src/ChainTypes";
var head_block_time_string;
var committee_min_review;
var base_expiration_sec = function () {
    var head_block_sec = Math.ceil(getHeadBlockDate().getTime() / 1000);
    var now_sec = Math.ceil(Date.now() / 1000);
    // The head block time should be updated every 3 seconds.  If it isn't
    // then help the transaction to expire (use head_block_sec)
    if (now_sec - head_block_sec > 30) {
        return head_block_sec;
    }
    // If the user's clock is very far behind, use the head block time.
    return Math.max(now_sec, head_block_sec);
};
function getHeadBlockDate() {
    return timeStringToDate(head_block_time_string);
}
function timeStringToDate(time_string) {
    if (!time_string) {
        return new Date("1970-01-01T00:00:00.000Z");
    }
    if (!/Z$/.test(time_string)) {
        // does not end in Z
        // https://github.com/cryptonomex/graphene/issues/368
        time_string = time_string + "Z";
    }
    return new Date(time_string);
}
var Transaction = /** @class */ (function () {
    function Transaction(wsConnect, options) {
        if (options === void 0) { options = {
            expire_in_secs_proposal: 86400,
            review_in_secs_committee: 43200,
            expire_in_secs: 30
        }; }
        this.wsConnect = wsConnect;
        this.options = options;
        this.ref_block_num = 0;
        this.ref_block_prefix = 0;
        this.expiration = 0;
        this.operations = [];
        this.signatures = [];
        this.signer_private_keys = [];
        this.signed = false;
        this.db_api = this.wsConnect.api("database");
        this.network_api = this.wsConnect.api("network_broadcast");
        // semi-private method bindings
    }
    /**
     *   @arg {string} name - like "transfer"
     *   @arg {object} operation - JSON matchching the operation's format
     */
    Transaction.prototype.add_type_operation = function (name, operation) {
        this.add_operation(this.get_type_operation(name, operation));
        return;
    };
    /**
     *  This does it all: set fees, finalize, sign, and broadcast (if wanted).
     *
     *  @arg {ConfidentialWallet} cwallet - must be unlocked, used to gather signing keys
     *  @arg {array<string>} [signer_pubkeys = null] - Optional ["GPHAbc9Def0...", ...].  These are additional signing keys.  Some balance claims require propritary address formats, the witness node can't tell us which ones are needed so they must be passed in.  If the witness node can figure out a signing key (mostly all other transactions), it should not be passed in here.
     *  @arg {boolean} [broadcast = false]
     */
    Transaction.prototype.process_transaction = function (cwallet, signer_pubkeys, broadcast) {
        var _this = this;
        if (signer_pubkeys === void 0) { signer_pubkeys = null; }
        if (broadcast === void 0) { broadcast = false; }
        var wallet_object = cwallet.wallet.wallet_object;
        return this.set_required_fees().then(function () {
            var signer_pubkeys_added = {};
            if (signer_pubkeys) {
                // Balance claims are by address, only the private
                // key holder can know about these additional
                // potential keys.
                var pubkeys = cwallet.getPubkeys_having_PrivateKey(signer_pubkeys);
                if (!pubkeys.length) {
                    throw new Error("Missing signing key");
                }
                for (var _i = 0, pubkeys_1 = pubkeys; _i < pubkeys_1.length; _i++) {
                    var pubkey_string = pubkeys_1[_i];
                    var private_key = cwallet.getPrivateKey(pubkey_string);
                    _this.add_signer(private_key, pubkey_string);
                    signer_pubkeys_added[pubkey_string] = true;
                }
            }
            return _this.get_potential_signatures()
                .then(function (_a) {
                var pubkeys = _a.pubkeys, addys = _a.addys;
                var my_pubkeys = cwallet.getPubkeys_having_PrivateKey(pubkeys, addys);
                // {//Testing only, don't send All public keys!
                //    var pubkeys_all = PrivateKeyStore.getPubkeys() // All public keys
                //    this.get_required_signatures(pubkeys_all).then( required_pubkey_strings =>
                //        console.log('get_required_signatures all\t',required_pubkey_strings.sort(), pubkeys_all))
                //    this.get_required_signatures(my_pubkeys).then( required_pubkey_strings =>
                //        console.log('get_required_signatures normal\t',required_pubkey_strings.sort(), pubkeys))
                // }
                return _this.get_required_signatures(my_pubkeys).then(function (required_pubkeys) {
                    for (var _i = 0, required_pubkeys_1 = required_pubkeys; _i < required_pubkeys_1.length; _i++) {
                        var pubkey_string = required_pubkeys_1[_i];
                        if (signer_pubkeys_added[pubkey_string]) {
                            continue;
                        }
                        var private_key = cwallet.getPrivateKey(pubkey_string);
                        if (!private_key) {
                            // This should not happen, get_required_signatures will only
                            // returned keys from my_pubkeys
                            throw new Error("Missing signing key for " + pubkey_string);
                        }
                        _this.add_signer(private_key, pubkey_string);
                    }
                });
            })
                .then(function () { return (broadcast ? _this.broadcast() : _this.serialize()); });
        });
    };
    /** Typically this is called automatically just prior to signing.  Once finalized this transaction can not be changed. */
    Transaction.prototype.finalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.tr_buffer) {
                    throw new Error("already finalized");
                }
                return [2 /*return*/, this.db_api("get_objects", ["2.1.0"]).then(function (r) {
                        head_block_time_string = r[0].time;
                        if (_this.expiration === 0) {
                            _this.expiration = base_expiration_sec() + _this.options.expire_in_secs;
                        }
                        _this.ref_block_num = r[0].head_block_number & 0xffff;
                        _this.ref_block_prefix = Buffer.from(r[0].head_block_id, "hex").readUInt32LE(4);
                        var iterable = _this.operations;
                        for (var i = 0, op; i < iterable.length; i++) {
                            op = iterable[i];
                            if (op[1]["finalize"]) {
                                op[1].finalize();
                            }
                        }
                        _this.tr_buffer = ops.transaction.toBuffer(_this);
                        return _this.tr_buffer;
                    })];
            });
        });
    };
    /** @return {string} hex transaction ID */
    Transaction.prototype.id = function () {
        if (!this.tr_buffer) {
            throw new Error("not finalized");
        }
        return hash
            .sha256(this.tr_buffer)
            .toString("hex")
            .substring(0, 40);
    };
    /**
     * Typically one will use {@link this.add_type_operation} instead.
     * @arg {array} operation - [operation_id, operation]
     */
    Transaction.prototype.add_operation = function (operation) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        assert(operation, "operation");
        if (!Array.isArray(operation)) {
            throw new Error("Expecting array [operation_id, operation]");
        }
        this.operations.push(operation);
        return;
    };
    Transaction.prototype.get_type_operation = function (name, operation) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        assert(name, "name");
        assert(operation, "operation");
        var _type = ops[name];
        assert(_type, "Unknown operation " + name);
        var operation_id = ChainTypes.operations[_type.operation_name];
        if (operation_id === undefined) {
            throw new Error("unknown operation: " + _type.operation_name);
        }
        if (!operation.fee) {
            operation.fee = { amount: 0, asset_id: 0 };
        }
        if (name === "proposal_create") {
            /*
             * Proposals involving the committee account require a review
             * period to be set, look for them here
             */
            var requiresReview_1 = false;
            var extraReview_1 = 0;
            operation.proposed_ops.forEach(function (op) {
                var COMMITTE_ACCOUNT = 0;
                var key;
                switch (op.op[0]) {
                    case 0: // transfer
                        key = "from";
                        break;
                    case 6: // account_update
                    case 17: // asset_settle
                        key = "account";
                        break;
                    case 10: // asset_create
                    case 11: // asset_update
                    case 12: // asset_update_bitasset
                    case 13: // asset_update_feed_producers
                    case 14: // asset_issue
                    case 18: // asset_global_settle
                    case 43: // asset_claim_fees
                        key = "issuer";
                        break;
                    case 15: // asset_reserve
                        key = "payer";
                        break;
                    case 16: // asset_fund_fee_pool
                        key = "from_account";
                        break;
                    case 22: // proposal_create
                    case 23: // proposal_update
                    case 24: // proposal_delete
                        key = "fee_paying_account";
                        break;
                    case 45: // initiate_crowdfund
                        key = "owner";
                        break;
                    case 31: // committee_member_update_global_parameters
                        requiresReview_1 = true;
                        extraReview_1 = 60 * 60 * 24 * 13; // Make the review period 2 weeks total
                        break;
                }
                if (key in op.op[1] && op.op[1][key] === COMMITTE_ACCOUNT) {
                    requiresReview_1 = true;
                }
            });
            operation.expiration_time ||
                (operation.expiration_time =
                    base_expiration_sec() + this.options.expire_in_secs_proposal);
            if (requiresReview_1) {
                operation.review_period_seconds =
                    extraReview_1 +
                        Math.max(committee_min_review, 24 * 60 * 60 || this.options.review_in_secs_committee);
                /*
                 * Expiration time must be at least equal to
                 * now + review_period_seconds, so we add one hour to make sure
                 */
                operation.expiration_time += 60 * 60 + extraReview_1;
            }
        }
        var operation_instance = _type.fromObject(operation);
        return [operation_id, operation_instance];
    };
    /* optional: fetch the current head block */
    Transaction.prototype.update_head_block = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all([
                        this.db_api("get_objects", ["2.0.0"]),
                        this.db_api("get_objects", ["2.1.0"])
                    ]).then(function (res) {
                        var g = res[0], r = res[1];
                        head_block_time_string = r[0].time;
                        committee_min_review = g[0].parameters.committee_proposal_review_period;
                    })];
            });
        });
    };
    /** optional: there is a deafult expiration */
    Transaction.prototype.set_expire_seconds = function (sec) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        return (this.expiration = base_expiration_sec() + sec);
    };
    /* Wraps this transaction in a proposal_create transaction */
    Transaction.prototype.propose = function (proposal_create_options) {
        if (this.tr_buffer) {
            throw new Error("already finalized");
        }
        if (!this.operations.length) {
            throw new Error("add operation first");
        }
        assert(proposal_create_options, "proposal_create_options");
        assert(proposal_create_options.fee_paying_account, "proposal_create_options.fee_paying_account");
        var proposed_ops = this.operations.map(function (op) {
            return { op: op };
        });
        this.operations = [];
        this.signatures = [];
        this.signer_private_keys = [];
        proposal_create_options.proposed_ops = proposed_ops;
        this.add_type_operation("proposal_create", proposal_create_options);
        return this;
    };
    Transaction.prototype.has_proposed_operation = function () {
        var hasProposed = false;
        for (var i = 0; i < this.operations.length; i++) {
            if ("proposed_ops" in this.operations[i][1]) {
                hasProposed = true;
                break;
            }
        }
        return hasProposed;
    };
    /** optional: the fees can be obtained from the witness node */
    Transaction.prototype.set_required_fees = function (asset_id) {
        return __awaiter(this, void 0, void 0, function () {
            var fee_pool, operations, i, op, op1_fee, promises, fees, coreFees, asset;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.tr_buffer) {
                    throw new Error("already finalized");
                }
                if (!this.operations.length) {
                    throw new Error("add operations first");
                }
                operations = [];
                for (i = 0, op = void 0; i < this.operations.length; i++) {
                    op = this.operations[i];
                    operations.push(ops.operation.toObject(op));
                }
                if (!asset_id) {
                    op1_fee = operations[0][1].fee;
                    asset_id =
                        op1_fee && op1_fee.asset_id !== null ? op1_fee.asset_id : "1.3.0";
                }
                promises = [
                    this.db_api.apply(this, ["get_required_fees"].concat([operations, asset_id]))
                ];
                if (asset_id !== "1.3.0") {
                    // This handles the fallback to paying fees in CYB if the fee pool is empty.
                    promises.push(this.db_api.apply(this, ["get_required_fees"].concat([operations, "1.3.0"])));
                    promises.push(this.db_api("get_objects", [[asset_id]]));
                }
                return [2 /*return*/, Promise.all(promises)
                        .then(function (results) {
                        fees = results[0], coreFees = results[1], asset = results[2];
                        asset = asset ? asset[0] : null;
                        var dynamicPromise = asset_id !== "1.3.0" && asset
                            ? _this.db_api.apply(_this, ["get_objects"].concat([[asset.dynamic_asset_data_id]])) : new Promise(function (resolve) { return resolve(); });
                        return dynamicPromise;
                    })
                        .then(function (dynamicObject) {
                        if (asset_id !== "1.3.0") {
                            fee_pool = dynamicObject ? dynamicObject[0].fee_pool : 0;
                            var totalFees = 0;
                            for (var j = 0, fee = void 0; j < coreFees.length; j++) {
                                fee = coreFees[j];
                                totalFees += fee.amount;
                            }
                            if (totalFees > parseInt(fee_pool, 10)) {
                                fees = coreFees;
                                asset_id = "1.3.0";
                            }
                        }
                        // Proposed transactions need to be flattened
                        var flat_assets = [];
                        var flatten = function (obj) {
                            if (Array.isArray(obj)) {
                                for (var k = 0, item = void 0; k < obj.length; k++) {
                                    item = obj[k];
                                    flatten(item);
                                }
                            }
                            else {
                                flat_assets.push(obj);
                            }
                            return;
                        };
                        flatten(fees);
                        var asset_index = 0;
                        var set_fee = function (operation) {
                            if (!operation.fee ||
                                operation.fee.amount === 0 ||
                                (operation.fee.amount.toString &&
                                    operation.fee.amount.toString() === "0") // Long
                            ) {
                                operation.fee = flat_assets[asset_index];
                                // console.log("new operation.fee", operation.fee)
                            }
                            else {
                                // console.log("old operation.fee", operation.fee)
                            }
                            asset_index++;
                            if (operation.proposed_ops) {
                                var result = [];
                                for (var y = 0; y < operation.proposed_ops.length; y++) {
                                    result.push(set_fee(operation.proposed_ops[y].op[1]));
                                }
                                return result;
                            }
                        };
                        for (var i = 0; i < _this.operations.length; i++) {
                            set_fee(_this.operations[i][1]);
                        }
                    })];
            });
        });
    };
    Transaction.prototype.get_potential_signatures = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tr_object;
            return __generator(this, function (_a) {
                tr_object = ops.signed_transaction.toObject(this);
                return [2 /*return*/, Promise.all([
                        this.db_api("get_potential_signatures", tr_object),
                        this.db_api("get_potential_address_signatures", tr_object)
                    ]).then(function (results) {
                        return { pubkeys: results[0], addys: results[1] };
                    })];
            });
        });
    };
    Transaction.prototype.get_required_signatures = function (available_keys) {
        return __awaiter(this, void 0, void 0, function () {
            var tr_object;
            return __generator(this, function (_a) {
                console.log("AvL: ", available_keys);
                if (!available_keys.length) {
                    return [2 /*return*/, Promise.resolve([])];
                }
                tr_object = ops.signed_transaction.toObject(this);
                // DEBUG console.log('... tr_object',tr_object)
                return [2 /*return*/, this.db_api.apply(this, ["get_required_signatures"].concat([tr_object, available_keys])).then(function (required_public_keys) {
                        // DEBUG console.log('... get_required_signatures',required_public_keys)
                        return required_public_keys;
                    })];
            });
        });
    };
    Transaction.prototype.add_signer = function (private_key, public_key) {
        if (public_key === void 0) { public_key = private_key.toPublicKey(); }
        assert(private_key.d, "required PrivateKey object");
        if (this.signed) {
            throw new Error("already signed");
        }
        if (!public_key.Q) {
            public_key = PublicKey.fromPublicKeyString(public_key);
        }
        // prevent duplicates
        var spHex = private_key.toHex();
        for (var _i = 0, _a = this.signer_private_keys; _i < _a.length; _i++) {
            var sp = _a[_i];
            if (sp[0].toHex() === spHex) {
                return;
            }
        }
        this.signer_private_keys.push([private_key, public_key]);
    };
    Transaction.prototype.sign = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chain_id, end, i, _a, private_key, public_key, sig;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db_api("get_chain_id")];
                    case 1:
                        chain_id = _b.sent();
                        if (!this.tr_buffer) {
                            throw new Error("not finalized");
                        }
                        if (this.signed) {
                            throw new Error("already signed");
                        }
                        if (!this.signer_private_keys.length) {
                            throw new Error("Transaction was not signed. Do you have a private key? [no_signers]");
                        }
                        end = this.signer_private_keys.length;
                        for (i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i++) {
                            _a = this.signer_private_keys[i], private_key = _a[0], public_key = _a[1];
                            sig = Signature.signBuffer(Buffer.concat([Buffer.from(chain_id, "hex"), this.tr_buffer]), private_key
                            // public_key
                            );
                            this.signatures.push(sig.toBuffer());
                        }
                        this.signer_private_keys = [];
                        this.signed = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Transaction.prototype.serialize = function () {
        return ops.signed_transaction.toObject(this);
    };
    Transaction.prototype.toObject = function () {
        return ops.signed_transaction.toObject(this);
    };
    Transaction.prototype.broadcast = function (was_broadcast_callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.tr_buffer) {
                    return [2 /*return*/, this._broadcast(was_broadcast_callback)];
                }
                else {
                    return [2 /*return*/, this.finalize().then(function () {
                            return _this._broadcast(was_broadcast_callback);
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    Transaction.prototype._broadcast = function (was_broadcast_callback) {
        return __awaiter(this, void 0, void 0, function () {
            var tr_object, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.signed) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sign()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.tr_buffer) {
                            throw new Error("not finalized");
                        }
                        if (!this.signatures.length) {
                            throw new Error("not signed");
                        }
                        if (!this.operations.length) {
                            throw new Error("no operations");
                        }
                        tr_object = ops.signed_transaction.toObject(this);
                        return [4 /*yield*/, this.network_api("broadcast_transaction_with_callback", tr_object)
                                .then(function (res) {
                                // console.log('... broadcast success, waiting for callback')
                                if (was_broadcast_callback) {
                                    was_broadcast_callback();
                                }
                                return;
                            })
                                .catch(function (error) {
                                // console.log may be redundant for network errors, other errors could occur
                                console.log(error);
                                var message = error.message;
                                if (!message) {
                                    message = "";
                                }
                                throw new Error(message +
                                    "\n" +
                                    "bitshares-crypto " +
                                    " digest " +
                                    hash.sha256(_this.tr_buffer).toString("hex") +
                                    " transaction " +
                                    _this.tr_buffer.toString("hex") +
                                    " " +
                                    JSON.stringify(tr_object));
                            })];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return Transaction;
}());
export { Transaction };
export default Transaction;
