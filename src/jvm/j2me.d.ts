/// <reference path="../../lib.d.ts" />
/** @const */ declare var release: boolean;
/** @const */ declare var profile: number;
/** @const */ declare var profileFormat: string;
declare var jsGlobal: any;
declare var inBrowser: (message?: any, ...optionalParams: any[]) => void;
declare var putstr: any;
declare var printErr: any;
declare var dateNow: () => number;
interface String {
    padRight(c: string, n: number): string;
    padLeft(c: string, n: number): string;
    endsWith(s: string): boolean;
}
interface Math {
    imul(a: number, b: number): number;
    /**
     * Returns the number of leading zeros of a number.
     * @param x A numeric expression.
     */
    clz32(x: number): number;
}
interface Error {
    stack: string;
}
declare module J2ME {
    function isIdentifierStart(c: any): boolean;
    function isIdentifierPart(c: any): boolean;
    function isIdentifierName(s: any): boolean;
    function isObject(value: any): boolean;
    function isNullOrUndefined(value: any): boolean;
    module Debug {
        function error(message: string): void;
        function assert(condition: any, message: string): void;
        function assertUnreachable(msg: string): void;
        function abstractMethod(message: string): void;
        function unexpected(message?: any): void;
    }
    function getTicks(): number;
    module ArrayUtilities {
        var EMPTY_ARRAY: any[];
        function makeArrays(length: number): any[][];
        /**
         * Pops elements from a source array into a destination array. This avoids
         * allocations and should be faster. The elements in the destination array
         * are pushed in the same order as they appear in the source array:
         *
         * popManyInto([1, 2, 3], 2, dst) => dst = [2, 3]
         */
        function popManyInto(src: any[], count: number, dst: any[]): void;
        function pushMany(dst: any[], src: any[]): void;
        function pushUnique<T>(array: T[], value: T): number;
        function unique<T>(array: T[]): T[];
        /**
         * You'd hope that new Array() triggers different heuristics about how and when it should fall back
         * to dictionary mode. I've experienced ION bailouts from non-dense new Arrays(), hence this helper
         * method.
         */
        function makeDenseArray(length: any, value: any): any[];
    }
    module ObjectUtilities {
        function createMap<K, V>(): Map<K, V>;
    }
    module FunctionUtilities {
        function makeForwardingGetter(target: string): () => any;
        function makeForwardingSetter(target: string): (any: any) => void;
        function makeDebugForwardingSetter(target: string, checker: (x: any) => boolean): (any: any) => void;
    }
    module StringUtilities {
        /**
         * Returns a reasonably sized description of the |value|, to be used for debugging purposes.
         */
        function toSafeString(value: any): string;
        function escapeString(str: string): string;
        function quote(s: string): string;
        function variableLengthEncodeInt32(n: any): string;
        function toEncoding(n: any): string;
        /**
         * The concatN() functions concatenate multiple strings in a way that
         * avoids creating intermediate strings, unlike String.prototype.concat().
         *
         * Note that these functions don't have identical behaviour to using '+',
         * because they will ignore any arguments that are |undefined| or |null|.
         * This usually doesn't matter.
         */
        function concat3(s0: any, s1: any, s2: any): string;
    }
    module HashUtilities {
        function hashBytesTo32BitsMurmur(data: Uint8Array, offset: number, length: number): number;
    }
    enum Numbers {
        MaxU16 = 65535,
        MaxI16 = 32767,
        MinI16 = -32768
    }
    module IntegerUtilities {
        var i32: Int32Array;
        var f32: Float32Array;
        var f64: Float64Array;
        /**
         * Convert 32 bits into a float.
         */
        function int32ToFloat(i: number): number;
        function int64ToDouble(high: number, low: number): number;
        function bitCount(i: number): number;
        function ones(i: number): number;
    }
    enum LogLevel {
        Error = 1,
        Warn = 2,
        Debug = 4,
        Log = 8,
        Info = 16,
        All = 31
    }
    class IndentingWriter {
        static PURPLE: string;
        static YELLOW: string;
        static GREEN: string;
        static RED: string;
        static BOLD_RED: string;
        static ENDC: string;
        static logLevel: LogLevel;
        static stdout: any;
        static stdoutNoNewline: any;
        static stderr: any;
        private _tab;
        private _padding;
        private _suppressOutput;
        private _out;
        private _outNoNewline;
        constructor(suppressOutput?: boolean, out?: any);
        write(str?: string, writePadding?: boolean): void;
        writeLn(str?: string): void;
        writeTimeLn(str?: string): void;
        writeComment(str: string): void;
        writeLns(str: string): void;
        errorLn(str: string): void;
        warnLn(str: string): void;
        debugLn(str: string): void;
        logLn(str: string): void;
        infoLn(str: string): void;
        yellowLn(str: string): void;
        greenLn(str: string): void;
        boldRedLn(str: string): void;
        redLn(str: string): void;
        purpleLn(str: string): void;
        colorLn(color: string, str: string): void;
        redLns(str: string): void;
        colorLns(color: string, str: string): void;
        enter(str: string): void;
        leaveAndEnter(str: string): void;
        leave(str: string): void;
        indent(): void;
        outdent(): void;
        writeArray(arr: any[], detailed?: boolean, noNumbers?: boolean): void;
    }
    module BitSets {
        var ADDRESS_BITS_PER_WORD: number;
        var BITS_PER_WORD: number;
        var BIT_INDEX_MASK: number;
        interface BitSet {
            set: (i: any) => void;
            setAll: () => void;
            assign: (set: BitSet) => void;
            clear: (i: number) => void;
            get: (i: number) => boolean;
            clearAll: () => void;
            intersect: (other: BitSet) => void;
            subtract: (other: BitSet) => void;
            negate: () => void;
            forEach: (fn: any) => void;
            toArray: () => boolean[];
            equals: (other: BitSet) => boolean;
            contains: (other: BitSet) => boolean;
            isEmpty: () => boolean;
            clone: () => BitSet;
            recount: () => void;
            toString: (names: string[]) => string;
            toBitString: (on: string, off: string) => string;
        }
        class Uint32ArrayBitSet implements BitSet {
            size: number;
            bits: Uint32Array;
            count: number;
            dirty: number;
            length: number;
            constructor(length: number);
            recount(): void;
            set(i: any): void;
            setAll(): void;
            assign(set: any): void;
            nextSetBit(from: number, to: number): number;
            clear(i: any): void;
            get(i: any): boolean;
            clearAll(): void;
            private _union;
            intersect(other: Uint32ArrayBitSet): void;
            subtract(other: Uint32ArrayBitSet): void;
            negate(): void;
            forEach(fn: any): void;
            toArray(): boolean[];
            equals(other: Uint32ArrayBitSet): boolean;
            contains(other: Uint32ArrayBitSet): boolean;
            toBitString: (on: string, off: string) => string;
            toString: (names: string[]) => string;
            isEmpty(): boolean;
            clone(): Uint32ArrayBitSet;
        }
    }
}
/**
 * Port of Java java.util.Hashtable.
 */
declare module J2ME {
    class Uint8HashtableEntry {
        hash: number;
        value: any;
        next: Uint8HashtableEntry;
        key: Uint8Array;
    }
    class Uint8Hashtable {
        table: Uint8HashtableEntry[];
        count: number;
        private threshold;
        private static loadFactorPercent;
        constructor(initialCapacity: number);
        contains(key: Uint8Array): boolean;
        getByRange(key: Uint8Array, offset: number, length: number): any;
        get(key: Uint8Array): any;
        put(key: Uint8Array, value: any): any;
        rehash(): void;
    }
}
declare module J2ME {
    enum UTF8Chars {
        a = 97,
        Z = 90,
        C = 67,
        F = 70,
        D = 68,
        B = 66,
        S = 83,
        I = 73,
        J = 74,
        V = 86,
        L = 76,
        OpenBracket = 91,
        Semicolon = 59,
        Dot = 46,
        Slash = 47,
        OpenParenthesis = 40,
        CloseParenthesis = 41
    }
    function strcmp(a: Uint8Array, b: Uint8Array): boolean;
    /**
     * Caches frequently used UTF8 strings. Only use this for a small set of frequently
     * used JS -> UTF8 conversions.
     */
    function cacheUTF8(s: string): any;
    function toUTF8(s: string): Uint8Array;
    function fromUTF8(s: Uint8Array): string;
    /**
     * Base class of all class file structs.
     */
    class ByteStream {
        buffer: Uint8Array;
        offset: number;
        private static internedOneByteArrays;
        private static internedThreeByteArraySignatures;
        private static internedMap;
        constructor(buffer: Uint8Array, offset: number);
        u2(offset: number): number;
        clone(): ByteStream;
        readU1(): number;
        peekU1(): number;
        readU2(): number;
        peekU16(): number;
        readU4(): number;
        skipU4(): void;
        readS4(): number;
        seek(offset: number): ByteStream;
        skip(length: number): ByteStream;
        /**
         * Interns small and frequently used Uint8Array buffers.
         *
         * Relative frequencies of readByte sizes.
         *  2011: readBytes 2
         *  1853: readBytes 1 - Special cased.
         *  1421: readBytes 4
         *  1170: readBytes 5
         *  1042: readBytes 3 - Special cased, most three byte buffers are signatures of the form "()?".
         *  1022: readBytes 6
         *
         * All other sizes are interned using a hashtable.
         */
        internBytes(length: number): Uint8Array;
        readBytes(length: number): Uint8Array;
        readInternedBytes(length: number): Uint8Array;
        static arrays: string[][];
        static getArray(length: number): string[];
        static readStringFast(buffer: Uint8Array): string;
        static readString(buffer: Uint8Array): any;
        static readStringSlow(buffer: Uint8Array): any;
        static readU16(buffer: Uint8Array, o: number): number;
    }
    enum ACCESS_FLAGS {
        ACC_PUBLIC = 1,
        ACC_PRIVATE = 2,
        ACC_PROTECTED = 4,
        ACC_STATIC = 8,
        ACC_FINAL = 16,
        ACC_SYNCHRONIZED = 32,
        ACC_VOLATILE = 64,
        ACC_TRANSIENT = 128,
        ACC_NATIVE = 256,
        ACC_INTERFACE = 512,
        ACC_ABSTRACT = 1024,
        J2ME_IMPLEMENTS_INTERFACE = 65536
    }
    enum TAGS {
        CONSTANT_Class = 7,
        CONSTANT_Fieldref = 9,
        CONSTANT_Methodref = 10,
        CONSTANT_InterfaceMethodref = 11,
        CONSTANT_String = 8,
        CONSTANT_Integer = 3,
        CONSTANT_Float = 4,
        CONSTANT_Long = 5,
        CONSTANT_Double = 6,
        CONSTANT_NameAndType = 12,
        CONSTANT_Utf8 = 1,
        CONSTANT_Unicode = 2,
        CONSTANT_Any = 13
    }
    class ConstantPool extends ByteStream {
        /**
         * Starting positions of each entry in the constant pool.
         */
        entries: Uint32Array;
        /**
         * Resolved constant pool references.
         */
        resolved: any[];
        /**
         * Size of each tag. This is used to jump over constant pool entries quickly.
         */
        private static tagSize;
        constructor(stream: ByteStream);
        /**
         * Quickly scan over the constant pool and record the position of each constant pool entry.
         */
        private scanEntries;
        resolveUtf8(i: number): Uint8Array;
        /**
         * Reads a 16-bit number at an offset from the constant pool entry index.
         */
        readTagU2(i: number, tag: TAGS, offset: number): number;
        /**
         * Seeks the current stream position to a specified constant pool entry and
         * returns the tag value.
         */
        private seekTag;
        /**
         * This causes the Utf8 string to be redecoded each time so don't use it often.
         */
        resolveUtf8String(i: number): string;
        resolveUtf8ClassNameString(i: number): string;
        resolveUtf8ClassName(i: number): Uint8Array;
        getConstantTag(i: number): TAGS;
        resolveString(i: number): string;
        /**
         * Resolves a constant pool reference.
         */
        resolve(i: number, expectedTag: TAGS, isStatic?: boolean): any;
        resolveClass(index: number): ClassInfo;
        resolveMethod(index: number, isStatic: boolean): MethodInfo;
        resolveField(index: number, isStatic: boolean): FieldInfo;
    }
    class FieldInfo extends ByteStream {
        classInfo: ClassInfo;
        kind: Kind;
        utf8Name: Uint8Array;
        utf8Signature: Uint8Array;
        mangledName: string;
        accessFlags: ACCESS_FLAGS;
        private _constantvalue_index;
        fTableIndex: number;
        constructor(classInfo: ClassInfo, offset: number);
        get isStatic(): boolean;
        get(object: java.lang.Object): any;
        set(object: java.lang.Object, value: any): void;
        getStatic(): any;
        setStatic(value: any): void;
        private scanFieldInfoAttributes;
        get constantValue(): any;
    }
    class SourceLocation {
        className: string;
        sourceFile: string;
        lineNumber: number;
        constructor(className: string, sourceFile: string, lineNumber: number);
        toString(): string;
        equals(other: SourceLocation): boolean;
    }
    class MethodInfoStats {
        callCount: number;
        bytecodeCount: number;
        backwardsBranchCount: number;
        interpreterCallCount: number;
    }
    class ExceptionEntryView extends ByteStream {
        get start_pc(): number;
        get end_pc(): number;
        get handler_pc(): number;
        get catch_type(): number;
    }
    function mangleClassAndMethod(methodInfo: MethodInfo): string;
    function mangleMethod(methodInfo: MethodInfo): string;
    /**
     * Encodes variable length utf8 alpha strings of the form [a-z]* to
     * 32 bit numbers. Below are some sample encodings:
     *
     *  "" => 0
     *  "a" => 1
     *  "b" => 2 ...
     *  "z" => 26
     *  "aa" => 27
     *  "ab" => 28 ...
     *  "zz" => 703
     *  "aaa" => 704
     *  "azz" => 1378
     *  "zzz" => 18278
     *
     *  The goal of this encoding is to map short strings to low numeric values
     *  that we can then use to index into tables.
     */
    function lowerCaseAlphaToInt32(utf8String: Uint8Array): number;
    function mangleClassName(utf8Name: Uint8Array): string;
    class MethodInfo extends ByteStream {
        classInfo: ClassInfo;
        accessFlags: ACCESS_FLAGS;
        fn: any;
        index: number;
        state: MethodState;
        stats: MethodInfoStats;
        codeAttribute: CodeAttribute;
        utf8Name: Uint8Array;
        utf8Signature: Uint8Array;
        returnKind: Kind;
        signatureKinds: Kind[];
        argumentSlots: number;
        consumeArgumentSlots: number;
        hasTwoSlotArguments: boolean;
        vTableIndex: number;
        private _virtualName;
        private _mangledName;
        private _mangledClassAndMethodName;
        private _implKey;
        private _name;
        private _signature;
        onStackReplacementEntryPoints: number[];
        exception_table_length: number;
        exception_table_offset: number;
        isOptimized: boolean;
        constructor(classInfo: ClassInfo, offset: number, index: number);
        /**
         * Clones this method info.
         */
        cloneMethodInfo(): MethodInfo;
        get virtualName(): string;
        get mangledName(): string;
        get mangledClassAndMethodName(): string;
        get name(): string;
        get signature(): string;
        get implementsInterface(): boolean;
        get implKey(): string;
        get isNative(): boolean;
        get isFinal(): boolean;
        get isPublic(): boolean;
        get isStatic(): boolean;
        get isSynchronized(): boolean;
        get isAbstract(): boolean;
        getSourceLocationForPC(pc: number): SourceLocation;
        getExceptionEntryViewByIndex(i: number): ExceptionEntryView;
        scanMethodInfoAttributes(): void;
    }
    class CodeAttribute {
        max_stack: number;
        max_locals: number;
        code: Uint8Array;
        constructor(s: ByteStream);
    }
    class ClassInfo extends ByteStream {
        constantPool: ConstantPool;
        utf8Name: Uint8Array;
        utf8SuperName: Uint8Array;
        superClass: ClassInfo;
        elementClass: ClassInfo;
        subClasses: ClassInfo[];
        allSubClasses: ClassInfo[];
        accessFlags: number;
        vTable: MethodInfo[];
        private vTableMap;
        fTable: FieldInfo[];
        klass: Klass;
        private resolvedFlags;
        private fields;
        private methods;
        private interfaces;
        private allInterfaces;
        sourceFile: string;
        mangledName: string;
        private _name;
        private _superName;
        constructor(buffer: Uint8Array);
        /**
         * Creates synthetic methodInfo objects in abstract classes for all unimplemented
         * interface methods. This is needed so that vTable entries are created correctly
         * for abstract classes that don't otherwise define methods for their implemented
         * interface.
         */
        private createAbstractMethods;
        private scanInterfaces;
        private scanFields;
        getClassNameSlow(): string;
        get superClassName(): string;
        /**
         * Gets the class hierarchy in derived -> base order.
         */
        private getClassHierarchy;
        private trace;
        complete(): void;
        /**
         * Constructs the VTable for this class by appending to or overriding methods
         * in the super class VTable.
         */
        private buildVTable;
        private buildFTable;
        private scanMethods;
        private addVTableEntry;
        private skipAttributes;
        scanClassInfoAttributes(): void;
        getMethodByIndex(i: number): MethodInfo;
        indexOfMethod(utf8Name: Uint8Array, utf8Signature: Uint8Array): number;
        getMethodByNameString(name: string, signature: string): MethodInfo;
        getLocalMethodByNameString(name: string, signature: string): MethodInfo;
        getLocalMethodByName(utf8Name: Uint8Array, utf8Signature: Uint8Array): MethodInfo;
        getMethodByName(utf8Name: Uint8Array, utf8Signature: Uint8Array): MethodInfo;
        getMethodCount(): number;
        getMethods(): MethodInfo[];
        getFieldByIndex(i: number): FieldInfo;
        indexOfField(utf8Name: Uint8Array, utf8Signature: Uint8Array): number;
        getFieldByName(utf8Name: Uint8Array, utf8Signature: Uint8Array, isStatic: boolean): FieldInfo;
        getFields(): FieldInfo[];
        getInterface(i: number): ClassInfo;
        getInterfaces(): ClassInfo[];
        getAllInterfaces(): ClassInfo[];
        get staticInitializer(): MethodInfo;
        /**
         * Object that holds static properties for this class.
         */
        getStaticObject(ctx: Context): java.lang.Object;
        get isInterface(): boolean;
        get isAbstract(): boolean;
        get isFinal(): boolean;
        implementsInterface(i: ClassInfo): boolean;
        isAssignableTo(toClass: ClassInfo): boolean;
        /**
         * java.lang.Class object for this class info. This is a not where static properties
         * are stored for this class.
         */
        getClassObject(): java.lang.Class;
    }
    class PrimitiveClassInfo extends ClassInfo {
        constructor(utf8Name: any, mangledName: any);
        static Z: PrimitiveClassInfo;
        static C: PrimitiveClassInfo;
        static F: PrimitiveClassInfo;
        static D: PrimitiveClassInfo;
        static B: PrimitiveClassInfo;
        static S: PrimitiveClassInfo;
        static I: PrimitiveClassInfo;
        static J: PrimitiveClassInfo;
    }
    class ArrayClassInfo extends ClassInfo {
        constructor(elementClass: ClassInfo);
        isAssignableTo(toClass: ClassInfo): boolean;
    }
    class ObjectArrayClassInfo extends ArrayClassInfo {
        constructor(elementClass: ClassInfo);
    }
    class PrimitiveArrayClassInfo extends ArrayClassInfo {
        constructor(elementClass: ClassInfo, mangledName: string);
        static initialize(): void;
        static Z: PrimitiveArrayClassInfo;
        static C: PrimitiveArrayClassInfo;
        static F: PrimitiveArrayClassInfo;
        static D: PrimitiveArrayClassInfo;
        static B: PrimitiveArrayClassInfo;
        static S: PrimitiveArrayClassInfo;
        static I: PrimitiveArrayClassInfo;
        static J: PrimitiveArrayClassInfo;
    }
}
declare module J2ME.Metrics {
    class Timer {
        private static _base;
        private static _top;
        private static _flat;
        private static _flatStack;
        private _parent;
        private _name;
        private _begin;
        private _last;
        private _total;
        private _count;
        private _timers;
        constructor(parent: Timer, name: string);
        static time(name: any, fn: Function): void;
        static start(name: any): void;
        static stop(): void;
        static stopStart(name: any): void;
        start(): void;
        stop(): void;
        toJSON(): {
            name: string;
            total: number;
            timers: Map<string, Timer>;
        };
        trace(writer: IndentingWriter): void;
        static trace(writer: IndentingWriter): void;
    }
    /**
     * Quick way to count named events.
     */
    class Counter {
        static instance: Counter;
        private _enabled;
        private _counts;
        private _times;
        get counts(): Map<string, number>;
        constructor(enabled: boolean);
        setEnabled(enabled: boolean): void;
        clear(): void;
        toJSON(): {
            counts: Map<string, number>;
            times: Map<string, number>;
        };
        count(name: string, increment?: number, time?: number): any;
        trace(writer: IndentingWriter): void;
        private _pairToString;
        toStringSorted(): string;
        traceSorted(writer: IndentingWriter, inline?: boolean): void;
    }
    class Average {
        private _samples;
        private _count;
        private _index;
        constructor(max: any);
        push(sample: number): void;
        average(): number;
    }
}
declare module J2ME.Bytecode {
    class Bytes {
        /**
         * Gets a signed 1-byte value.
         */
        static beS1(data: Uint8Array, bci: number): number;
        /**
         * Gets a signed 2-byte big-endian value.
         */
        static beS2(data: Uint8Array, bci: number): number;
        /**
         * Gets an unsigned 1-byte value.
         */
        static beU1(data: Uint8Array, bci: number): number;
        /**
         * Gets an unsigned 2-byte big-endian value.
         */
        static beU2(data: Uint8Array, bci: number): number;
        /**
         * Gets a signed 4-byte big-endian value.
         */
        static beS4(data: Uint8Array, bci: number): number;
        /**
         * Gets either a signed 2-byte or a signed 4-byte big-endian value.
         */
        static beSVar(data: Uint8Array, bci: number, fourByte: boolean): number;
    }
    enum Condition {
        /**
         * Equal.
         */
        EQ = 0,
        /**
         * Not equal.
         */
        NE = 1,
        /**
         * Signed less than.
         */
        LT = 2,
        /**
         * Signed less than or equal.
         */
        LE = 3,
        /**
         * Signed greater than.
         */
        GT = 4,
        /**
         * Signed greater than or equal.
         */
        GE = 5,
        /**
         * Unsigned greater than or equal ("above than or equal").
         */
        AE = 6,
        /**
         * Unsigned less than or equal ("below than or equal").
         */
        BE = 7,
        /**
         * Unsigned greater than ("above than").
         */
        AT = 8,
        /**
         * Unsigned less than ("below than").
         */
        BT = 9,
        /**
         * Operation produced an overflow.
         */
        OF = 10,
        /**
         * Operation did not produce an overflow.
         */
        NOF = 11
    }
    /**
     * The definitions of the bytecodes that are valid input to the compiler and
     * related utility methods. This comprises two groups: the standard Java
     * bytecodes defined by <a href=
     * "http://java.sun.com/docs/books/jvms/second_edition/html/VMSpecTOC.doc.html">
     * Java Virtual Machine Specification</a>, and a set of <i>extended</i>
     * bytecodes that support low-level programming, for example, memory barriers.
     *
     * The extended bytecodes are one or three bytes in size. The one-byte bytecodes
     * follow the values in the standard set, with no gap. The three-byte extended
     * bytecodes share a common first byte and carry additional instruction-specific
     * information in the second and third bytes.
     */
    enum Bytecodes {
        NOP = 0,
        ACONST_NULL = 1,
        ICONST_M1 = 2,
        ICONST_0 = 3,
        ICONST_1 = 4,
        ICONST_2 = 5,
        ICONST_3 = 6,
        ICONST_4 = 7,
        ICONST_5 = 8,
        LCONST_0 = 9,
        LCONST_1 = 10,
        FCONST_0 = 11,
        FCONST_1 = 12,
        FCONST_2 = 13,
        DCONST_0 = 14,
        DCONST_1 = 15,
        BIPUSH = 16,
        SIPUSH = 17,
        LDC = 18,
        LDC_W = 19,
        LDC2_W = 20,
        ILOAD = 21,
        LLOAD = 22,
        FLOAD = 23,
        DLOAD = 24,
        ALOAD = 25,
        ILOAD_0 = 26,
        ILOAD_1 = 27,
        ILOAD_2 = 28,
        ILOAD_3 = 29,
        LLOAD_0 = 30,
        LLOAD_1 = 31,
        LLOAD_2 = 32,
        LLOAD_3 = 33,
        FLOAD_0 = 34,
        FLOAD_1 = 35,
        FLOAD_2 = 36,
        FLOAD_3 = 37,
        DLOAD_0 = 38,
        DLOAD_1 = 39,
        DLOAD_2 = 40,
        DLOAD_3 = 41,
        ALOAD_0 = 42,
        ALOAD_1 = 43,
        ALOAD_2 = 44,
        ALOAD_3 = 45,
        IALOAD = 46,
        LALOAD = 47,
        FALOAD = 48,
        DALOAD = 49,
        AALOAD = 50,
        BALOAD = 51,
        CALOAD = 52,
        SALOAD = 53,
        ISTORE = 54,
        LSTORE = 55,
        FSTORE = 56,
        DSTORE = 57,
        ASTORE = 58,
        ISTORE_0 = 59,
        ISTORE_1 = 60,
        ISTORE_2 = 61,
        ISTORE_3 = 62,
        LSTORE_0 = 63,
        LSTORE_1 = 64,
        LSTORE_2 = 65,
        LSTORE_3 = 66,
        FSTORE_0 = 67,
        FSTORE_1 = 68,
        FSTORE_2 = 69,
        FSTORE_3 = 70,
        DSTORE_0 = 71,
        DSTORE_1 = 72,
        DSTORE_2 = 73,
        DSTORE_3 = 74,
        ASTORE_0 = 75,
        ASTORE_1 = 76,
        ASTORE_2 = 77,
        ASTORE_3 = 78,
        IASTORE = 79,
        LASTORE = 80,
        FASTORE = 81,
        DASTORE = 82,
        AASTORE = 83,
        BASTORE = 84,
        CASTORE = 85,
        SASTORE = 86,
        POP = 87,
        POP2 = 88,
        DUP = 89,
        DUP_X1 = 90,
        DUP_X2 = 91,
        DUP2 = 92,
        DUP2_X1 = 93,
        DUP2_X2 = 94,
        SWAP = 95,
        IADD = 96,
        LADD = 97,
        FADD = 98,
        DADD = 99,
        ISUB = 100,
        LSUB = 101,
        FSUB = 102,
        DSUB = 103,
        IMUL = 104,
        LMUL = 105,
        FMUL = 106,
        DMUL = 107,
        IDIV = 108,
        LDIV = 109,
        FDIV = 110,
        DDIV = 111,
        IREM = 112,
        LREM = 113,
        FREM = 114,
        DREM = 115,
        INEG = 116,
        LNEG = 117,
        FNEG = 118,
        DNEG = 119,
        ISHL = 120,
        LSHL = 121,
        ISHR = 122,
        LSHR = 123,
        IUSHR = 124,
        LUSHR = 125,
        IAND = 126,
        LAND = 127,
        IOR = 128,
        LOR = 129,
        IXOR = 130,
        LXOR = 131,
        IINC = 132,
        I2L = 133,
        I2F = 134,
        I2D = 135,
        L2I = 136,
        L2F = 137,
        L2D = 138,
        F2I = 139,
        F2L = 140,
        F2D = 141,
        D2I = 142,
        D2L = 143,
        D2F = 144,
        I2B = 145,
        I2C = 146,
        I2S = 147,
        LCMP = 148,
        FCMPL = 149,
        FCMPG = 150,
        DCMPL = 151,
        DCMPG = 152,
        IFEQ = 153,
        IFNE = 154,
        IFLT = 155,
        IFGE = 156,
        IFGT = 157,
        IFLE = 158,
        IF_ICMPEQ = 159,
        IF_ICMPNE = 160,
        IF_ICMPLT = 161,
        IF_ICMPGE = 162,
        IF_ICMPGT = 163,
        IF_ICMPLE = 164,
        IF_ACMPEQ = 165,
        IF_ACMPNE = 166,
        GOTO = 167,
        JSR = 168,
        RET = 169,
        TABLESWITCH = 170,
        LOOKUPSWITCH = 171,
        IRETURN = 172,
        LRETURN = 173,
        FRETURN = 174,
        DRETURN = 175,
        ARETURN = 176,
        RETURN = 177,
        GETSTATIC = 178,
        PUTSTATIC = 179,
        GETFIELD = 180,
        PUTFIELD = 181,
        INVOKEVIRTUAL = 182,
        INVOKESPECIAL = 183,
        INVOKESTATIC = 184,
        INVOKEINTERFACE = 185,
        XXXUNUSEDXXX = 186,
        NEW = 187,
        NEWARRAY = 188,
        ANEWARRAY = 189,
        ARRAYLENGTH = 190,
        ATHROW = 191,
        CHECKCAST = 192,
        INSTANCEOF = 193,
        MONITORENTER = 194,
        MONITOREXIT = 195,
        WIDE = 196,
        MULTIANEWARRAY = 197,
        IFNULL = 198,
        IFNONNULL = 199,
        GOTO_W = 200,
        JSR_W = 201,
        BREAKPOINT = 202,
        ALOAD_ILOAD = 210,
        IINC_GOTO = 211,
        ARRAYLENGTH_IF_ICMPGE = 212,
        RESOLVED_GETFIELD = 213,
        RESOLVED_PUTFIELD = 214,
        RESOLVED_INVOKEVIRTUAL = 215,
        ILLEGAL = 255,
        END = 256,
        /**
         * The last opcode defined by the JVM specification. To iterate over all JVM bytecodes:
         */
        LAST_JVM_OPCODE = 201
    }
    /**
     * A array that maps from a bytecode value to the set of {@link Flags} for the corresponding instruction.
     */
    var flags: Uint32Array;
    /**
     * A array that maps from a bytecode value to the length in bytes for the corresponding instruction.
     */
    var length: Uint32Array;
    /**
     * Gets the length of an instruction denoted by a given opcode.
     */
    function lengthOf(opcode: Bytecodes): number;
    function lengthAt(code: Uint8Array, bci: number): number;
    /**
     * Determines if a given opcode denotes an instruction that can cause an implicit exception.
     */
    function canTrap(opcode: Bytecodes): boolean;
    /**
     * Determines if a given opcode denotes an instruction that ends a basic block and does not let control flow fall
     * through to its lexical successor.
     */
    function isStop(opcode: Bytecodes): boolean;
    /**
     * Determines if a given opcode denotes an instruction that stores a value to a local variable
     * after popping it from the operand stack.
     */
    function isInvoke(opcode: Bytecodes): boolean;
    /**
     * Determines if a given opcode denotes an instruction that stores a value to a local variable
     * after popping it from the operand stack.
     */
    function isStore(opcode: Bytecodes): boolean;
    /**
     * Determines if a given opcode is an instruction that delimits a basic block.
     */
    function isBlockEnd(opcode: Bytecodes): boolean;
    /**
     * Determines if a given opcode is a return bytecode.
     */
    function isReturn(opcode: Bytecodes): boolean;
    class BytecodeSwitch {
        /**
         * The bytecode array or {@code null} if {@link #stream} is not {@code null}.
         */
        private code;
        /**
         * Index of start of switch instruction.
         */
        protected bci: number;
        /**
         * Index of the start of the additional data for the switch instruction, aligned to a multiple of four from the method start.
         */
        protected alignedBci: number;
        /**
         * Constructor for a bytecode array.
         * @param code the bytecode array containing the switch instruction.
         * @param bci the index in the array of the switch instruction
         */
        constructor(code: Uint8Array, bci: number);
        /**
         * Gets the index of the instruction denoted by the {@code i}'th switch target.
         * @param i index of the switch target
         * @return the index of the instruction denoted by the {@code i}'th switch target
         */
        targetAt(i: number): number;
        /**
         * Gets the index of the instruction for the default switch target.
         * @return the index of the instruction for the default switch target
         */
        defaultTarget(): number;
        /**
         * Gets the offset from the start of the switch instruction to the default switch target.
         * @return the offset to the default switch target
         */
        defaultOffset(): number;
        /**
         * Gets the key at {@code i}'th switch target index.
         * @param i the switch target index
         * @return the key at {@code i}'th switch target index
         */
        keyAt(i: number): number;
        /**
         * Gets the offset from the start of the switch instruction for the {@code i}'th switch target.
         * @param i the switch target index
         * @return the offset to the {@code i}'th switch target
         */
        offsetAt(i: number): number;
        /**
         * Gets the number of switch targets.
         * @return the number of switch targets
         */
        numberOfCases(): number;
        /**
         * Gets the total size in bytes of the switch instruction.
         * @return the total size in bytes of the switch instruction
         */
        size(): number;
        /**
         * Reads the signed value at given bytecode index.
         * @param bci the start index of the value to retrieve
         * @return the signed, 4-byte value in the bytecode array starting at {@code bci}
         */
        protected readWord(bci: number): number;
    }
    class BytecodeTableSwitch extends BytecodeSwitch {
        private static OFFSET_TO_LOW_KEY;
        private static OFFSET_TO_HIGH_KEY;
        private static OFFSET_TO_FIRST_JUMP_OFFSET;
        private static JUMP_OFFSET_SIZE;
        /**
         * Constructor for a bytecode array.
         * @param code the bytecode array containing the switch instruction.
         * @param bci the index in the array of the switch instruction
         */
        constructor(code: Uint8Array, bci: number);
        /**
         * Gets the low key of the table switch.
         */
        lowKey(): number;
        /**
         * Gets the high key of the table switch.
         */
        highKey(): number;
        keyAt(i: number): number;
        defaultOffset(): number;
        offsetAt(i: number): number;
        numberOfCases(): number;
        size(): number;
    }
    class BytecodeLookupSwitch extends BytecodeSwitch {
        private static OFFSET_TO_NUMBER_PAIRS;
        private static OFFSET_TO_FIRST_PAIR_MATCH;
        private static OFFSET_TO_FIRST_PAIR_OFFSET;
        private static PAIR_SIZE;
        constructor(code: Uint8Array, bci: number);
        defaultOffset(): number;
        offsetAt(i: number): number;
        keyAt(i: any): number;
        numberOfCases(): number;
        size(): number;
    }
    /**
     * A utility class that makes iterating over bytecodes and reading operands
     * simpler and less error prone. For example, it handles the {@link Bytecodes#WIDE} instruction
     * and wide variants of instructions internally.
     */
    class BytecodeStream {
        private _code;
        private _opcode;
        private _currentBCI;
        private _nextBCI;
        constructor(code: Uint8Array);
        /**
         * Advances to the next bytecode.
         */
        next(): void;
        /**
         * Gets the bytecode index of the end of the code.
         */
        endBCI(): number;
        /**
         * Gets the next bytecode index (no side-effects).
         */
        get nextBCI(): number;
        /**
         * Gets the current bytecode index.
         */
        get currentBCI(): number;
        /**
         * Gets the current opcode. This method will never return the
         * {@link Bytecodes#WIDE WIDE} opcode, but will instead
         * return the opcode that is modified by the {@code WIDE} opcode.
         * @return the current opcode; {@link Bytecodes#END} if at or beyond the end of the code
         */
        currentBC(): Bytecodes;
        rawCurrentBC(): Bytecodes;
        /**
         * Sets the current opcode.
         */
        writeCurrentBC(bc: Bytecodes): void;
        /**
         * Gets the next opcode.
         * @return the next opcode; {@link Bytecodes#END} if at or beyond the end of the code
         */
        nextBC(): Bytecodes;
        /**
         * Reads the index of a local variable for one of the load or store instructions.
         * The WIDE modifier is handled internally.
         */
        readLocalIndex(): number;
        /**
         * Read the delta for an {@link Bytecodes#IINC} bytecode.
         */
        readIncrement(): number;
        /**
         * Read the destination of a {@link Bytecodes#GOTO} or {@code IF} instructions.
         * @return the destination bytecode index
         */
        readBranchDest(): number;
        /**
         * Read the destination of a {@link Bytecodes#GOTO_W} or {@link Bytecodes#JSR_W} instructions.
         * @return the destination bytecode index
         */
        readFarBranchDest(): number;
        /**
         * Read a signed 4-byte integer from the bytecode stream at the specified bytecode index.
         * @param bci the bytecode index
         * @return the integer value
         */
        readInt(bci: number): number;
        /**
         * Reads an unsigned, 1-byte value from the bytecode stream at the specified bytecode index.
         * @param bci the bytecode index
         * @return the byte
         */
        readUByte(bci: number): number;
        /**
         * Reads a constant pool index for the current instruction.
         * @return the constant pool index
         */
        readCPI(): number;
        /**
         * Reads a signed, 1-byte value for the current instruction (e.g. BIPUSH).
         */
        readByte(): number;
        /**
         * Reads a signed, 2-byte short for the current instruction (e.g. SIPUSH).
         */
        readShort(): number;
        /**
         * Sets the bytecode index to the specified value.
         * If {@code bci} is beyond the end of the array, {@link #currentBC} will return
         * {@link Bytecodes#END} and other methods may throw {@link ArrayIndexOutOfBoundsException}.
         * @param bci the new bytecode index
         */
        setBCI(bci: number): void;
        readTableSwitch(): BytecodeTableSwitch;
        readLookupSwitch(): BytecodeLookupSwitch;
    }
}
declare module J2ME.Bytecode {
    class Block {
        startBci: number;
        endBci: number;
        isExceptionEntry: boolean;
        isLoopHeader: boolean;
        isLoopEnd: boolean;
        hasHandlers: boolean;
        blockID: number;
        relooperBlockID: number;
        region: any;
        successors: Block[];
        predecessors: Block[];
        normalSuccessors: number;
        visited: boolean;
        active: boolean;
        loops: number;
        exits: number;
        loopID: number;
        isInnerLoopHeader(): boolean;
        constructor();
        clone(): Block;
    }
    class ExceptionBlock extends Block {
        handler: ExceptionEntryView;
        deoptBci: number;
    }
    class BlockMap {
        method: MethodInfo;
        blocks: Block[];
        hasBackwardBranches: boolean;
        invokeCount: number;
        private blockMap;
        private startBlock;
        private canTrap;
        constructor(method: MethodInfo);
        build(): void;
        private makeExceptionEntries;
        private computeLoopStores;
        private initializeBlockIDs;
        getBlock(bci: number): Block;
        getOSREntryPoints(): any[];
        private makeBlock;
        private makeSwitchSuccessors;
        private setSuccessors;
        canTrapAt(opcode: Bytecodes, bci: number): boolean;
        private iterateOverBytecodes;
        /**
         * The next available loop number.
         */
        private _nextLoop;
        /**
         * Mark the block as a loop header, using the next available loop number.
         * Also checks for corner cases that we don't want to compile.
         */
        private makeLoopHeader;
        private handlerIsCatchAll;
        private exceptionDispatch;
        private makeExceptionDispatch;
        private addExceptionEdges;
        private fixLoopBits;
        private computeBlockOrder;
        /**
         * Depth-first traversal of the control flow graph. The flag {@linkplain Block#visited} is used to
         * visit every block only once. The flag {@linkplain Block#active} is used to detect cycles (backward
         * edges).
         */
        private computeBlockOrderFrom;
        blockToString(block: Block): string;
        trace(writer: IndentingWriter, traceBytecode?: boolean): void;
        traceDOTFile(writer: IndentingWriter): void;
    }
}
declare module J2ME {
    enum Kind {
        Boolean = 0,
        Byte = 1,
        Short = 2,
        Char = 3,
        Int = 4,
        Float = 5,
        Long = 6,
        Double = 7,
        Reference = 8,
        Void = 9,
        Illegal = 10,
        Store = 11
    }
    function isTwoSlot(kind: Kind): boolean;
    var valueKinds: Kind[];
    function stackKind(kind: Kind): Kind;
    function arrayTypeCodeToKind(typeCode: any): Kind;
    function kindCharacter(kind: Kind): string;
    function getKindCheck(kind: Kind): (x: any) => boolean;
    function getSignatureKind(signature: Uint8Array): Kind;
    /**
     * Returns an array of kinds that appear in a method signature. The first element is always the
     * return kind. The returned array is shared, so you if you need a copy of it, you'll need to
     * clone it.
     *
     * The parsing algorithm needs some global state to keep track of the current position in the
     * descriptor, namely |globalNextIndex| which always points to the next index in the descriptor
     * after a token has been consumed.
     */
    function parseMethodDescriptorKinds(value: Uint8Array, startIndex: number): Kind[];
    function signatureHasTwoSlotArguments(signatureKinds: Kind[]): boolean;
    function signatureArgumentSlotCount(signatureKinds: Kind[]): number;
}
declare module J2ME {
    var classCounter: Metrics.Counter;
    class ClassRegistry {
        /**
         * List of directories to look for source files in.
         */
        sourceDirectories: string[];
        /**
         * All source code, only ever used for debugging.
         */
        sourceFiles: Map<string, string[]>;
        /**
         * List of classes whose sources files were not found. We keep track
         * of them so we don't have to search for them over and over.
         */
        missingSourceFiles: Map<string, string[]>;
        classes: Map<string, ClassInfo>;
        preInitializedClasses: ClassInfo[];
        java_lang_Object: ClassInfo;
        java_lang_Class: ClassInfo;
        java_lang_String: ClassInfo;
        java_lang_Thread: ClassInfo;
        constructor();
        initializeBuiltinClasses(): void;
        isPreInitializedClass(classInfo: ClassInfo): boolean;
        addSourceDirectory(name: string): void;
        getSourceLine(sourceLocation: SourceLocation): string;
        loadClassBytes(bytes: Uint8Array): ClassInfo;
        loadClassFile(fileName: string): ClassInfo;
        loadClass(className: string): ClassInfo;
        loadAndLinkClass(className: string): ClassInfo;
        getEntryPoint(classInfo: ClassInfo): MethodInfo;
        getClass(className: string): ClassInfo;
        createArrayClass(typeName: string): ArrayClassInfo;
    }
    var ClassNotFoundException: (message: any) => void;
}
declare module J2ME {
    var CLASSES: ClassRegistry;
    import Isolate = com.sun.cldc.isolate.Isolate;
    class JVM {
        constructor();
        private createIsolateCtx;
        startIsolate0(className: string, args: string[]): void;
        startIsolate(isolate: Isolate): void;
    }
}
declare var JVM: typeof J2ME.JVM;
declare module J2ME {
    var BindingsMap: Uint8Hashtable;
    module java.lang {
        interface Object {
            /**
             * Reference to the runtime klass.
             */
            klass: Klass;
            /**
             * All objects have an internal hash code.
             */
            _hashCode: number;
            /**
             * Some objects may have a lock.
             */
            _lock: Lock;
            clone(): java.lang.Object;
            equals(obj: java.lang.Object): boolean;
            finalize(): void;
            getClass(): java.lang.Class;
            hashCode(): number;
            notify(): void;
            notifyAll(): void;
            toString(): java.lang.String;
            notify(): void;
            notify(timeout: number): void;
            notify(timeout: number, nanos: number): void;
        }
        interface Class extends java.lang.Object {
            /**
             * RuntimeKlass associated with this Class object.
             */
            runtimeKlass: RuntimeKlass;
            status: number;
            initialize(): void;
        }
        interface String extends java.lang.Object {
            str: string;
        }
        interface Thread extends java.lang.Object {
            pid: number;
            alive: boolean;
            priority: number;
        }
        interface Exception extends java.lang.Object {
            message: string;
        }
        interface InstantiationException extends java.lang.Exception {
        }
        interface IllegalArgumentException extends java.lang.Exception {
        }
        interface IllegalStateException extends java.lang.Exception {
        }
        interface NullPointerException extends java.lang.Exception {
        }
        interface RuntimeException extends java.lang.Exception {
        }
        interface IndexOutOfBoundsException extends java.lang.Exception {
        }
        interface ArrayIndexOutOfBoundsException extends java.lang.Exception {
        }
        interface StringIndexOutOfBoundsException extends java.lang.Exception {
        }
        interface ArrayStoreException extends java.lang.Exception {
        }
        interface IllegalMonitorStateException extends java.lang.Exception {
        }
        interface ClassCastException extends java.lang.Exception {
        }
        interface NegativeArraySizeException extends java.lang.Exception {
        }
        interface ArithmeticException extends java.lang.Exception {
        }
        interface ClassNotFoundException extends java.lang.Exception {
        }
        interface SecurityException extends java.lang.Exception {
        }
        interface IllegalThreadStateException extends java.lang.Exception {
        }
    }
    module java.io {
        interface IOException extends java.lang.Exception {
        }
        interface UTFDataFormatException extends java.lang.Exception {
        }
        interface UnsupportedEncodingException extends java.lang.Exception {
        }
        interface OutputStream extends java.lang.Object {
        }
        interface ByteArrayOutputStream extends OutputStream {
            count: number;
            buf: Int8Array;
        }
        interface Writer extends java.lang.Object {
        }
    }
    module javax.microedition.media {
        interface MediaException extends java.lang.Exception {
        }
    }
    module com.sun.cldc.isolate {
        interface Isolate extends java.lang.Object {
            id: number;
            runtime: Runtime;
            _mainArgs: java.lang.String[];
            _mainClass: java.lang.String;
            _priority: number;
        }
    }
    module com.sun.cldc.i18n {
        interface StreamWriter extends java.io.Writer {
        }
    }
    module com.sun.cldc.i18n.j2me {
        interface UTF_8_Writer extends com.sun.cldc.i18n.StreamWriter {
            pendingSurrogate: number;
        }
    }
    module javax.microedition.lcdui {
        interface Graphics extends java.lang.Object {
        }
        interface ImageData extends java.lang.Object {
            width: number;
            height: number;
            isMutable: boolean;
        }
        interface Image extends java.lang.Object {
            width: number;
            height: number;
            imageData: javax.microedition.lcdui.ImageData;
        }
    }
    module com.nokia.mid.ui {
        interface DirectGraphicsImp extends java.lang.Object {
            graphics: javax.microedition.lcdui.Graphics;
        }
    }
    module com.sun.midp.events {
        interface Event {
            type: number;
            next: com.sun.midp.events.Event;
        }
        interface NativeEvent extends com.sun.midp.events.Event {
            intParam1: number;
            intParam2: number;
            intParam3: number;
            intParam4: number;
            intParam5: number;
            intParam6: number;
            intParam7: number;
            intParam8: number;
            intParam9: number;
            intParam10: number;
            intParam11: number;
            intParam12: number;
            intParam13: number;
            intParam14: number;
            intParam15: number;
            intParam16: number;
            floatParam1: number;
            stringParam1: java.lang.String;
            stringParam2: java.lang.String;
            stringParam3: java.lang.String;
            stringParam4: java.lang.String;
            stringParam5: java.lang.String;
            stringParam6: java.lang.String;
        }
    }
    module com.sun.j2me.pim {
        interface PIMFieldDescriptor {
            field: number;
            dataType: number;
            maxValues: number;
        }
    }
}
declare module J2ME {
    /** @const */ var MAX_PRIORITY: number;
    /** @const */ var MIN_PRIORITY: number;
    /** @const */ var NORMAL_PRIORITY: number;
    /** @const */ var ISOLATE_MIN_PRIORITY: number;
    /** @const */ var ISOLATE_NORM_PRIORITY: number;
    /** @const */ var ISOLATE_MAX_PRIORITY: number;
    /**
     * Number of preemption checks thus far.
     */
    var preemptionCount: number;
    /**
     * Used to block preemptions from happening during code that can't handle them.
     */
    var preemptionLockLevel: number;
    /**
     * The scheduler tracks the amount of time(virtualRuntime) that each thread has had to execute
     * and tries to always execute the thread that has had least amount of time to run next.
     * For higher priority threads the virtual runtime is increased at a slower rate to give them
     * more time to be the the front of the queue and vice versa for low priority threads. To allow
     * the event loop a turn there is an overall MAX_WINDOW_EXECUTION_TIME that if reached will yield
     * all the threads and schedule them to resume on a setTimeout. This allows us to run up to
     * MAX_WINDOW_EXECUTION_TIME/PREEMPTION_INTERVAL threads per execution window.
     */
    class Scheduler {
        static enqueue(ctx: Context, directExecution?: boolean): void;
        private static processRunningQueue;
        private static updateMinVirtualRuntime;
        private static updateCurrentRuntime;
        static shouldPreempt(): boolean;
    }
}
declare var $: J2ME.Runtime;
interface Math {
    fround(value: number): number;
}
interface Long {
    isZero(): boolean;
}
declare var Long: {
    new (low: number, high: number): Long;
    ZERO: Long;
    fromBits(lowBits: number, highBits: number): Long;
    fromInt(value: number): any;
    fromNumber(value: number): any;
};
interface Promise {
    catch(onRejected: {
        (reason: any): any;
    }): Promise;
}
interface CompiledMethodCache {
    get(key: string): {
        key: string;
        source: string;
        referencedClasses: string[];
    };
    put(obj: {
        key: string;
        source: string;
        referencedClasses: string[];
    }): Promise;
}
interface AOTMetaData {
    /**
     * On stack replacement pc entry points.
     */
    osr: number[];
}
declare var throwHelper: any;
declare var throwPause: any;
declare var throwYield: any;
declare module J2ME {
    var aotMetaData: {
        string: AOTMetaData;
    };
    /**
     * Turns on just-in-time compilation of methods.
     */
    var enableRuntimeCompilation: boolean;
    /**
     * Turns on onStackReplacement
     */
    var enableOnStackReplacement: boolean;
    /**
     * Turns on caching of JIT-compiled methods.
     */
    var enableCompiledMethodCache: boolean;
    /**
     * Traces method execution.
     */
    var traceWriter: any;
    /**
     * Traces performance problems.
     */
    var perfWriter: any;
    /**
     * Traces linking and class loading.
     */
    var linkWriter: any;
    /**
     * Traces JIT compilation.
     */
    var jitWriter: any;
    /**
     * Traces class loading.
     */
    var loadWriter: any;
    /**
     * Traces winding and unwinding.
     */
    var windingWriter: any;
    /**
     * Traces class initialization.
     */
    var initWriter: any;
    /**
     * Traces thread execution.
     */
    var threadWriter: any;
    /**
     * Traces generated code.
     */
    var codeWriter: any;
    enum MethodState {
        /**
         * All methods start in this state.
         */
        Cold = 0,
        /**
         * Methods have this state if code has been compiled for them or
         * there is a native implementation that needs to be used.
         */
        Compiled = 1,
        /**
         * We don't want to compiled these methods, they may be too large
         * to benefit from JIT compilation.
         */
        NotCompiled = 2,
        /**
         * Methods are not compiled because of some exception.
         */
        CannotCompile = 3
    }
    var timeline: any;
    var threadTimeline: any;
    var methodTimelines: any[];
    var nativeCounter: Metrics.Counter;
    var runtimeCounter: Metrics.Counter;
    var baselineMethodCounter: Metrics.Counter;
    var asyncCounter: Metrics.Counter;
    var jitMethodInfos: {};
    var unwindCount: number;
    function enterTimeline(name: string, data?: any): void;
    function leaveTimeline(name?: string, data?: any): void;
    var Klasses: {
        java: {
            lang: {
                Object: any;
                Class: any;
                String: any;
                Thread: any;
                IllegalArgumentException: any;
                IllegalStateException: any;
                NullPointerException: any;
                RuntimeException: any;
                IndexOutOfBoundsException: any;
                ArrayIndexOutOfBoundsException: any;
                StringIndexOutOfBoundsException: any;
                ArrayStoreException: any;
                IllegalMonitorStateException: any;
                ClassCastException: any;
                NegativeArraySizeException: any;
                ArithmeticException: any;
                ClassNotFoundException: any;
                SecurityException: any;
                IllegalThreadStateException: any;
                InstantiationException: any;
                Exception: any;
            };
            io: {
                IOException: any;
                UTFDataFormatException: any;
                UnsupportedEncodingException: any;
            };
        };
        javax: {
            microedition: {
                media: {
                    MediaException: any;
                };
            };
        };
        boolean: any;
        char: any;
        float: any;
        double: any;
        byte: any;
        short: any;
        int: any;
        long: any;
    };
    function getArrayConstructor(type: string): Function;
    var stdoutWriter: IndentingWriter;
    var stderrWriter: IndentingWriter;
    enum ExecutionPhase {
        /**
         * Default runtime behaviour.
         */
        Runtime = 0,
        /**
         * When compiling code statically.
         */
        Compiler = 1
    }
    var phase: ExecutionPhase;
    var internedStrings: Map<string, java.lang.String>;
    enum RuntimeStatus {
        New = 1,
        Started = 2,
        Stopping = 3,
        Stopped = 4
    }
    enum MethodType {
        Interpreted = 0,
        Native = 1,
        Compiled = 2
    }
    function hashUTF8String(s: Uint8Array): number;
    function escapeString(s: string): string;
    function hashStringToString(s: string): any;
    /**
     * This class is abstract and should never be initialized. It only acts as a template for
     * actual runtime objects.
     */
    class RuntimeTemplate {
        static all: Set<unknown>;
        jvm: JVM;
        status: RuntimeStatus;
        waiting: any[];
        threadCount: number;
        initialized: any;
        pending: any;
        staticFields: any;
        classObjects: any;
        ctx: Context;
        allCtxs: Set<Context>;
        isolate: com.sun.cldc.isolate.Isolate;
        priority: number;
        mainThread: java.lang.Thread;
        private static _nextRuntimeId;
        private _runtimeId;
        private _nextHashCode;
        constructor(jvm: JVM);
        preInitializeClasses(ctx: Context): void;
        /**
         * After class intialization is finished the init9 method will invoke this so
         * any further initialize calls can be avoided. This isn't set on the first call
         * to a class initializer because there can be multiple calls into initialize from
         * different threads that need trigger the Class.initialize() code so they block.
         */
        setClassInitialized(runtimeKlass: RuntimeKlass): void;
        getRuntimeKlass(klass: Klass): RuntimeKlass;
        /**
         * Generates a new hash code for the specified |object|.
         */
        nextHashCode(): number;
        waitStatus(callback: any): void;
        updateStatus(status: RuntimeStatus): void;
        addContext(ctx: any): void;
        removeContext(ctx: any): void;
        newStringConstant(s: string): java.lang.String;
        setStatic(field: any, value: any): void;
        getStatic(field: any): any;
        newIOException(str?: string): java.io.IOException;
        newUnsupportedEncodingException(str?: string): java.io.UnsupportedEncodingException;
        newUTFDataFormatException(str?: string): java.io.UTFDataFormatException;
        newSecurityException(str?: string): java.lang.SecurityException;
        newIllegalThreadStateException(str?: string): java.lang.IllegalThreadStateException;
        newRuntimeException(str?: string): java.lang.RuntimeException;
        newIndexOutOfBoundsException(str?: string): java.lang.IndexOutOfBoundsException;
        newArrayIndexOutOfBoundsException(str?: string): java.lang.ArrayIndexOutOfBoundsException;
        newStringIndexOutOfBoundsException(str?: string): java.lang.StringIndexOutOfBoundsException;
        newArrayStoreException(str?: string): java.lang.ArrayStoreException;
        newIllegalMonitorStateException(str?: string): java.lang.IllegalMonitorStateException;
        newClassCastException(str?: string): java.lang.ClassCastException;
        newArithmeticException(str?: string): java.lang.ArithmeticException;
        newClassNotFoundException(str?: string): java.lang.ClassNotFoundException;
        newIllegalArgumentException(str?: string): java.lang.IllegalArgumentException;
        newIllegalStateException(str?: string): java.lang.IllegalStateException;
        newNegativeArraySizeException(str?: string): java.lang.NegativeArraySizeException;
        newNullPointerException(str?: string): java.lang.NullPointerException;
        newMediaException(str?: string): javax.microedition.media.MediaException;
        newInstantiationException(str?: string): java.lang.InstantiationException;
        newException(str?: string): java.lang.Exception;
    }
    enum VMState {
        Running = 0,
        Yielding = 1,
        Pausing = 2,
        Stopping = 3
    }
    class Runtime extends RuntimeTemplate {
        private static _nextId;
        id: number;
        /**
         * Bailout callback whenever a JIT frame is unwound.
         */
        B(pc: number, nextPC: number, local: any[], stack: any[], lockObject: java.lang.Object): void;
        /**
         * Bailout callback whenever a JIT frame is unwound that uses a slightly different calling
         * convetion that makes it more convenient to emit in some cases.
         */
        T(location: UnwindThrowLocation, local: any[], stack: any[], lockObject: java.lang.Object): void;
        yield(reason: string): void;
        pause(reason: string): void;
        stop(): void;
        constructor(jvm: JVM);
    }
    class Class {
        klass: Klass;
        constructor(klass: Klass);
    }
    /**
     * Representation of a template class.
     */
    interface Klass extends Function {
        new (): java.lang.Object;
        /**
         * Array klass of this klass, constructed via \arrayKlass\.
         */
        arrayKlass: Klass;
        superKlass: Klass;
        /**
         * Would be nice to remove this. So we try not to depend on it too much.
         */
        classInfo: ClassInfo;
        /**
         * Flattened array of super klasses. This makes type checking easy,
         * see |classInstanceOf|.
         */
        display: Klass[];
        /**
         * Flattened array of super klasses. This makes type checking easy,
         * see |classInstanceOf|.
         */
        interfaces: Klass[];
        /**
         * Depth in the class hierarchy.
         */
        depth: number;
        classSymbols: string[];
        /**
         * Static constructor, not all klasses have one.
         */
        staticConstructor: () => void;
        /**
         * Whether this class is an interface class.
         */
        isInterfaceKlass: boolean;
        isArrayKlass: boolean;
        elementKlass: Klass;
        /**
         * Links class method.
         */
        m(index: number): Function;
        /**
         * Resolve constant pool entry.
         */
        c(index: number): any;
        /**
         * Linked class methods.
         */
        M: Function[];
    }
    class RuntimeKlass {
        templateKlass: Klass;
        /**
         * Java class object. This is only available on runtime klasses and it points to itself. We go trough
         * this indirection in VM code for now so that we can easily change it later if we need to.
         */
        classObject: java.lang.Class;
        /**
         * Whether this class is a runtime class.
         */
        constructor(templateKlass: Klass);
    }
    class Lock {
        thread: java.lang.Thread;
        level: number;
        ready: Context[];
        waiting: Context[];
        constructor(thread: java.lang.Thread, level: number);
    }
    /**
     * Registers the klass as a getter on the runtime template. On first access, the getter creates a runtime klass and
     * adds it to the runtime.
     */
    function registerKlass(klass: Klass, classInfo: ClassInfo): void;
    function registerKlassSymbol(className: string): void;
    function registerKlassSymbols(classNames: string[]): void;
    function getKlass(classInfo: ClassInfo): Klass;
    function makeArrayKlassConstructor(elementKlass: Klass): Klass;
    /**
     * TODO: Find out if we need to also run class initialization here, or if the
     * callers should be calling that instead of this.
     */
    function linkKlass(classInfo: ClassInfo): void;
    function getLinkedMethod(methodInfo: MethodInfo): any;
    function extendKlass(classInfo: ClassInfo, klass: Klass, superKlass: Klass): void;
    /**
     * Number of methods that have been compiled thus far.
     */
    var compiledMethodCount: number;
    /**
     * Number of methods that have not been compiled thus far.
     */
    var notCompiledMethodCount: number;
    /**
     * Number of methods that have been loaded from the code cache thus far.
     */
    var cachedMethodCount: number;
    /**
     * Number of methods that have been loaded from ahead of time compiled code thus far.
     */
    var aotMethodCount: number;
    /**
     * Compiles method and links it up at runtime.
     */
    function compileAndLinkMethod(methodInfo: MethodInfo): void;
    /**
     * Links up compiled method at runtime.
     */
    function linkMethod(methodInfo: MethodInfo, source: string, referencedClasses: string[], onStackReplacementEntryPoints: any): void;
    function isAssignableTo(from: Klass, to: Klass): boolean;
    function instanceOfKlass(object: java.lang.Object, klass: Klass): boolean;
    function instanceOfInterface(object: java.lang.Object, klass: Klass): boolean;
    function checkCastKlass(object: java.lang.Object, klass: Klass): void;
    function checkCastInterface(object: java.lang.Object, klass: Klass): void;
    function newObject(klass: Klass): java.lang.Object;
    function newString(str: string): java.lang.String;
    function newArray(klass: Klass, size: number): any;
    function newMultiArray(klass: Klass, lengths: number[]): any;
    function throwNegativeArraySizeException(): void;
    function newObjectArray(size: number): java.lang.Object[];
    function newStringArray(size: number): java.lang.String[];
    function newByteArray(size: number): number[];
    function newIntArray(size: number): number[];
    function getArrayKlass(elementKlass: Klass): Klass;
    function toDebugString(value: any): string;
    function fromJavaString(value: java.lang.String): string;
    function checkDivideByZero(value: number): void;
    function checkDivideByZeroLong(value: Long): void;
    /**
     * Do bounds check using only one branch. The math works out because array.length
     * can't be larger than 2^31 - 1. So |index| >>> 0 will be larger than
     * array.length if it is less than zero. We need to make the right side unsigned
     * as well because otherwise the SM optimization that converts this to an
     * unsinged branch doesn't kick in.
     */
    function checkArrayBounds(array: any[], index: number): void;
    function throwArrayIndexOutOfBoundsException(index: number): void;
    function throwArithmeticException(): void;
    function checkArrayStore(array: java.lang.Object, value: any): void;
    function checkNull(object: java.lang.Object): void;
    enum Constants {
        BYTE_MIN = -128,
        BYTE_MAX = 127,
        SHORT_MIN = -32768,
        SHORT_MAX = 32767,
        CHAR_MIN = 0,
        CHAR_MAX = 65535,
        INT_MIN = -2147483648,
        INT_MAX = 2147483647
    }
    function monitorEnter(object: J2ME.java.lang.Object): void;
    function monitorExit(object: J2ME.java.lang.Object): void;
    function translateException(e: any): any;
    function classInitCheck(classInfo: ClassInfo): void;
    function preempt(): void;
    class UnwindThrowLocation {
        static instance: UnwindThrowLocation;
        pc: number;
        sp: number;
        nextPC: number;
        constructor();
        setLocation(pc: number, nextPC: number, sp: number): this;
        getPC(): number;
        getSP(): number;
        getNextPC(): number;
    }
    /**
     * Generic unwind throw.
     */
    function throwUnwind(pc: number, nextPC?: number, sp?: number): void;
    /**
     * Unwind throws with different stack heights. This is useful so we can
     * save a few bytes encoding the stack height in the function name.
     */
    function throwUnwind0(pc: number, nextPC?: number): void;
    function throwUnwind1(pc: number, nextPC?: number): void;
    function throwUnwind2(pc: number, nextPC?: number): void;
    function throwUnwind3(pc: number, nextPC?: number): void;
    function throwUnwind4(pc: number, nextPC?: number): void;
    function throwUnwind5(pc: number, nextPC?: number): void;
    function throwUnwind6(pc: number, nextPC?: number): void;
    function throwUnwind7(pc: number, nextPC?: number): void;
}
declare var Runtime: typeof J2ME.Runtime;
declare var AOTMD: {
    string: AOTMetaData;
};
/**
 * Are we currently unwinding the stack because of a Yield? This technically
 * belonges to a context but we store it in the global object because it is
 * read very often.
 */
declare var U: J2ME.VMState;
declare var B0: typeof J2ME.throwUnwind0;
declare var B1: typeof J2ME.throwUnwind1;
declare var B2: typeof J2ME.throwUnwind2;
declare var B3: typeof J2ME.throwUnwind3;
declare var B4: typeof J2ME.throwUnwind4;
declare var B5: typeof J2ME.throwUnwind5;
declare var B6: typeof J2ME.throwUnwind6;
declare var B7: typeof J2ME.throwUnwind7;
/**
 * OSR Frame.
 */
declare var O: J2ME.Frame;
/**
 * Runtime exports for compiled code.
 * DO NOT use these short names outside of compiled code.
 */
declare var IOK: typeof J2ME.instanceOfKlass;
declare var IOI: typeof J2ME.instanceOfInterface;
declare var CCK: typeof J2ME.checkCastKlass;
declare var CCI: typeof J2ME.checkCastInterface;
declare var AK: typeof J2ME.getArrayKlass;
declare var NA: typeof J2ME.newArray;
declare var NM: typeof J2ME.newMultiArray;
declare var CDZ: typeof J2ME.checkDivideByZero;
declare var CDZL: typeof J2ME.checkDivideByZeroLong;
declare var CAB: typeof J2ME.checkArrayBounds;
declare var CAS: typeof J2ME.checkArrayStore;
declare var ME: typeof J2ME.monitorEnter;
declare var MX: typeof J2ME.monitorExit;
declare var TE: typeof J2ME.translateException;
declare var TI: typeof J2ME.throwArrayIndexOutOfBoundsException;
declare var TA: typeof J2ME.throwArithmeticException;
declare var TN: typeof J2ME.throwNegativeArraySizeException;
declare var PE: typeof J2ME.preempt;
declare var PS: number;
declare module J2ME {
    var interpreterCounter: any;
    var interpreterMethodCounter: Metrics.Counter;
    /**
     * The number of opcodes executed thus far.
     */
    var bytecodeCount: number;
    /**
     * The number of times the interpreter method was called thus far.
     */
    var interpreterCount: number;
    var onStackReplacementCount: number;
    function interpret(): any;
    class VM {
        static execute: typeof interpret;
        static Yield: {
            toString: () => string;
        };
        static Pause: {
            toString: () => string;
        };
        static DEBUG_PRINT_ALL_EXCEPTIONS: boolean;
    }
}
declare var VM: typeof J2ME.VM;
declare var Shumway: any;
declare var profiling: any;
interface Array<T> {
    push2: (value: any) => void;
    pop2: () => any;
    pushKind: (kind: J2ME.Kind, value: any) => void;
    popKind: (kind: J2ME.Kind) => any;
    read: (i: any) => any;
}
declare module J2ME {
    import Bytecodes = Bytecode.Bytecodes;
    enum WriterFlags {
        None = 0,
        Trace = 1,
        Link = 2,
        Init = 4,
        Perf = 8,
        Load = 16,
        JIT = 32,
        Code = 64,
        Thread = 128,
        All = 255
    }
    /**
     * Toggle VM tracing here.
     */
    var writers: WriterFlags;
    var frameCount: number;
    class Frame {
        methodInfo: MethodInfo;
        local: any[];
        stack: any[];
        code: Uint8Array;
        pc: number;
        opPC: number;
        lockObject: java.lang.Object;
        static dirtyStack: Frame[];
        /**
         * Denotes the start of the context frame stack.
         */
        static Start: Frame;
        /**
         * Marks a frame set.
         */
        static Marker: Frame;
        static isMarker(frame: Frame): boolean;
        constructor(methodInfo: MethodInfo, local: any[]);
        reset(methodInfo: MethodInfo, local: any[]): void;
        static create(methodInfo: MethodInfo, local: any[]): Frame;
        free(): void;
        incLocal(i: number, value: any): void;
        read8(): number;
        peek8(): number;
        read16(): number;
        patch(offset: number, oldValue: Bytecodes, newValue: Bytecodes): void;
        read32(): number;
        read8Signed(): number;
        read16Signed(): number;
        readTargetPC(): number;
        read32Signed(): number;
        tableSwitch(): number;
        lookupSwitch(): number;
        wide(): void;
        /**
         * Returns the |object| on which a call to the specified |methodInfo| would be
         * called.
         */
        peekInvokeObject(methodInfo: MethodInfo): java.lang.Object;
        popArgumentsInto(methodInfo: MethodInfo, args: any): any[];
        toString(): string;
        trace(writer: IndentingWriter): void;
    }
    class Context {
        runtime: Runtime;
        private static _nextId;
        private static _colors;
        private static writer;
        id: number;
        priority: number;
        /**
         * Whether or not the context is currently paused.  The profiler uses this
         * to distinguish execution time from paused time in an async method.
         */
        paused: boolean;
        private frames;
        bailoutFrames: Frame[];
        lockTimeout: number;
        lockLevel: number;
        thread: java.lang.Thread;
        writer: IndentingWriter;
        methodTimeline: any;
        virtualRuntime: number;
        constructor(runtime: Runtime);
        static color(id: any): any;
        static currentContextPrefix(): string;
        /**
         * Sets global writers. Uncomment these if you want to see trace output.
         */
        static setWriters(writer: IndentingWriter): void;
        kill(): void;
        current(): Frame;
        popFrame(): Frame;
        pushFrame(frame: Frame): void;
        private popMarkerFrame;
        executeFrame(frame: Frame): any;
        createException(className: string, message?: string): java.lang.Object;
        setAsCurrentContext(): void;
        clearCurrentContext(): void;
        start(frames: Frame[]): void;
        execute(): void;
        resume(): void;
        block(obj: any, queue: any, lockLevel: any): void;
        unblock(obj: any, queue: any, notifyAll: any): void;
        wakeup(obj: any): void;
        monitorEnter(object: java.lang.Object): void;
        monitorExit(object: java.lang.Object): void;
        wait(object: java.lang.Object, timeout: any): void;
        notify(obj: any, notifyAll: any): void;
        bailout(methodInfo: MethodInfo, pc: number, nextPC: number, local: any[], stack: any[], lockObject: java.lang.Object): void;
        pauseMethodTimeline(): void;
        resumeMethodTimeline(): void;
        /**
         * Re-enters all the frames that are currently on the stack so the full stack
         * trace shows up in the profiler.
         */
        restartMethodTimeline(): void;
        enterMethodTimeline(key: string, methodType: MethodType): void;
        leaveMethodTimeline(key: string, methodType: MethodType): void;
    }
}
declare var Context: typeof J2ME.Context;
declare var Frame: typeof J2ME.Frame;
declare function countTimeline(message: string, object?: Object): void;
declare function enterTimeline(message: string): void;
declare function leaveTimeline(message?: string): void;
declare module J2ME {
    class CompilerBailout {
        message: string;
        constructor(message: string);
        toString(): string;
    }
}
declare module J2ME {
    import Bytecodes = Bytecode.Bytecodes;
    var yieldCounter: any;
    var yieldGraph: any;
    enum YieldReason {
        None = 0,
        Root = 1,
        Synchronized = 2,
        MonitorEnterExit = 3,
        Virtual = 4,
        Cycle = 5,
        Yield = 6,
        Likely = 7
    }
    /**
     * Root set of methods that can yield. Keep this up to date or else the compiler will not generate yield code
     * at the right spots.
     */
    var yieldMap: {
        "com/sun/midp/lcdui/DisplayDevice.refresh0.(IIIIII)V": YieldReason;
        "com/sun/midp/main/MIDletSuiteUtils.vmBeginStartUp.(I)V": YieldReason;
        "com/sun/midp/lcdui/DisplayDevice.gainedForeground0.(II)V": YieldReason;
        "com/sun/cdc/io/j2me/file/DefaultFileHandler.openForRead.()V": YieldReason;
        "com/sun/cdc/io/j2me/file/DefaultFileHandler.openForWrite.()V": YieldReason;
        "com/sun/cdc/io/j2me/file/DefaultFileHandler.write.([BII)I": YieldReason;
        "java/lang/Thread.sleep.(J)V": YieldReason;
        "com/sun/cldc/isolate/Isolate.waitStatus.(I)V": YieldReason;
        "com/sun/j2me/location/PlatformLocationProvider.waitForNewLocation.(IJ)Z": YieldReason;
        "com/sun/javame/sensor/NativeChannel.doMeasureData.(II)[B": YieldReason;
        "com/sun/midp/util/isolate/InterIsolateMutex.lock0.(I)V": YieldReason;
        "com/sun/midp/events/NativeEventMonitor.waitForNativeEvent.(Lcom/sun/midp/events/NativeEvent;)I": YieldReason;
        "com/sun/midp/io/j2me/push/ConnectionRegistry.poll0.(J)I": YieldReason;
        "com/sun/midp/rms/RecordStoreFile.openRecordStoreFile.(Ljava/lang/String;Ljava/lang/String;I)I": YieldReason;
        "com/sun/midp/io/j2me/storage/RandomAccessStream.open.(Ljava/lang/String;I)I": YieldReason;
        "javax/microedition/lcdui/ImageDataFactory.createImmutableImageDecodeImage.(Ljavax/microedition/lcdui/ImageData;[BII)V": YieldReason;
        "com/nokia/mid/ui/TextEditorThread.getNextDirtyEditor.()Lcom/nokia/mid/ui/TextEditor;": YieldReason;
        "com/nokia/mid/ui/TextEditor.setFocus.(Z)V": YieldReason;
        "com/nokia/mid/ui/VKVisibilityNotificationRunnable.sleepUntilVKVisibilityChange.()Z": YieldReason;
        "org/mozilla/io/LocalMsgConnection.init.(Ljava/lang/String;)V": YieldReason;
        "org/mozilla/io/LocalMsgConnection.receiveData.([B)I": YieldReason;
        "org/mozilla/io/LocalMsgConnection.waitConnection.()V": YieldReason;
        "com/sun/mmedia/DirectPlayer.nGetDuration.(I)I": YieldReason;
        "com/sun/mmedia/DirectPlayer.nGetMediaTime.(I)I": YieldReason;
        "com/sun/mmedia/PlayerImpl.nRealize.(ILjava/lang/String;)Z": YieldReason;
        "com/sun/mmedia/DirectRecord.nPause.(I)I": YieldReason;
        "com/sun/mmedia/DirectRecord.nStop.(I)I": YieldReason;
        "com/sun/mmedia/DirectRecord.nClose.(I)I": YieldReason;
        "com/sun/mmedia/DirectRecord.nStart.(I)I": YieldReason;
        "com/sun/midp/io/j2me/socket/Protocol.open0.([BI)V": YieldReason;
        "com/sun/midp/io/j2me/socket/Protocol.read0.([BII)I": YieldReason;
        "com/sun/midp/io/j2me/socket/Protocol.write0.([BII)I": YieldReason;
        "com/sun/midp/io/j2me/socket/Protocol.close0.()V": YieldReason;
        "com/sun/midp/io/j2me/sms/Protocol.receive0.(IIILcom/sun/midp/io/j2me/sms/Protocol$SMSPacket;)I": YieldReason;
        "com/sun/midp/io/j2me/sms/Protocol.send0.(IILjava/lang/String;II[B)I": YieldReason;
        "com/sun/j2me/pim/PIMProxy.getNextItemDescription0.(I[I)Z": YieldReason;
        "java/lang/Object.wait.(J)V": YieldReason;
        "java/lang/Class.invoke_clinit.()V": YieldReason;
        "java/lang/Thread.yield.()V": YieldReason;
        "java/lang/Thread.start0.()V": YieldReason;
        "java/lang/Class.forName0.(Ljava/lang/String;)V": YieldReason;
        "java/lang/Class.newInstance1.(Ljava/lang/Object;)V": YieldReason;
        "gnu/testlet/vm/NativeTest.throwExceptionAfterPause.()V": YieldReason;
        "gnu/testlet/vm/NativeTest.returnAfterPause.()I": YieldReason;
        "gnu/testlet/vm/NativeTest.dumbPipe.()Z": YieldReason;
        "gnu/testlet/TestHarness.getNumDifferingPixels.(Ljava/lang/String;)I": YieldReason;
        "org/mozilla/MemorySampler.sampleMemory.(Ljava/lang/String;)V": YieldReason;
        "org/mozilla/Test.callAsyncNative.()V": YieldReason;
        "javax/wireless/messaging/SendSMSTest.getNumber.()Ljava/lang/String;": YieldReason;
        "javax/wireless/messaging/SendSMSTest.getBody.()Ljava/lang/String;": YieldReason;
    };
    var yieldVirtualMap: {};
    var noPreemptMap: {
        "java/lang/Class.initialize.()V": boolean;
    };
    function isFinalClass(classInfo: ClassInfo): boolean;
    function isFinalMethod(methodInfo: MethodInfo): boolean;
    function gatherCallees(callees: MethodInfo[], classInfo: ClassInfo, methodInfo: MethodInfo): void;
    function isStaticallyBound(op: Bytecodes, methodInfo: MethodInfo): boolean;
    function traceYieldGraph(writer: IndentingWriter): void;
    function canStaticInitializerYield(classInfo: ClassInfo): YieldReason;
    function canYield(methodInfo: MethodInfo): YieldReason;
}
declare module J2ME {
    import Bytecodes = Bytecode.Bytecodes;
    import Condition = Bytecode.Condition;
    import BytecodeStream = Bytecode.BytecodeStream;
    import Block = Bytecode.Block;
    interface Relooper {
        addBlock(text: string, branchVar?: string): number;
        addBranch(from: number, to: number, condition?: string, code?: string): any;
        render(entry: number): string;
        init(): string;
    }
    var baselineCounter: any;
    /**
     * Emits array bounds checks. Although this is necessary for correctness, most
     * applications work without them.
     */
    var emitCheckArrayBounds: boolean;
    /**
     * Inline calls to runtime methods whenever possible.
     */
    var inlineRuntimeCalls: boolean;
    /**
     * Emits array store type checks. Although this is necessary for correctness,
     * most applications work without them.
     */
    var emitCheckArrayStore: boolean;
    /**
     * Emits preemption checks for methods that already yield.
     */
    var emitCheckPreemption: boolean;
    function baselineCompileMethod(methodInfo: MethodInfo, target: CompilationTarget): CompiledMethodInfo;
    enum Precedence {
        Sequence = 0,
        Assignment = 3,
        Conditional = 4,
        LogicalOR = 5,
        LogicalAND = 6,
        BitwiseOR = 7,
        BitwiseXOR = 8,
        BitwiseAND = 9,
        Equality = 10,
        Relational = 11,
        BitwiseShift = 12,
        Addition = 13,
        Subtraction = 13,
        Multiplication = 14,
        Division = 14,
        Remainder = 14,
        UnaryNegation = 15,
        LogicalNOT = 15,
        Postfix = 16,
        Call = 17,
        New = 18,
        Member = 18,
        Primary = 19
    }
    class BaselineCompiler {
        sp: number;
        pc: number;
        private target;
        private bodyEmitter;
        private blockEmitter;
        private blockMap;
        private methodInfo;
        private parameters;
        private hasHandlers;
        private hasMonitorEnter;
        private blockStackHeightMap;
        private initializedClasses;
        private referencedClasses;
        private local;
        private stack;
        private blockStack;
        private blockStackPrecedence;
        private variables;
        private lockObject;
        private hasOSREntryPoint;
        private entryBlock;
        private isPrivileged;
        static localNames: string[];
        /**
         * Make sure that none of these shadow global names, like "U" and "O".
         */
        static stackNames: string[];
        /**
         * Indicates whether a unwind throw was emitted.
         */
        private hasUnwindThrow;
        constructor(methodInfo: MethodInfo, target: CompilationTarget);
        compile(): CompiledMethodInfo;
        needsVariable(name: string, value?: string): void;
        setSuccessorsBlockStackHeight(block: Block, sp: number): void;
        localClassConstant(classInfo: ClassInfo): string;
        emitBody(): void;
        private emitExceptionHandler;
        /**
         * Resets block level optimization state.
         */
        resetOptimizationState(): void;
        emitBlockBody(stream: BytecodeStream, block: Block): void;
        private emitPrologue;
        private emitEntryPoints;
        lookupClass(cpi: number): ClassInfo;
        lookupMethod(cpi: number, opcode: Bytecodes, isStatic: boolean): MethodInfo;
        lookupField(cpi: number, opcode: Bytecodes, isStatic: boolean): FieldInfo;
        getStackName(i: number): string;
        getStack(i: number, contextPrecedence: Precedence): string;
        getLocalName(i: number): string;
        getLocal(i: number): string;
        emitLoadLocal(kind: Kind, i: number): void;
        emitStoreLocal(kind: Kind, i: number): void;
        peekAny(): string;
        peek(kind: Kind, precedence?: Precedence): string;
        popAny(): string;
        emitPopTemporaries(n: number): void;
        emitPushTemporary(...indices: number[]): void;
        pop(kind: Kind, contextPrecedence?: Precedence): string;
        emitPushAny(v: any): void;
        emitPushInteger(v: any): void;
        emitPush(kind: Kind, v: any, precedence: Precedence): void;
        flushBlockStack(): void;
        emitReturn(kind: Kind): void;
        emitGetField(fieldInfo: FieldInfo, isStatic: boolean): void;
        emitPutField(fieldInfo: FieldInfo, isStatic: boolean): void;
        setBlockStackHeight(pc: number, height: number): void;
        emitIf(block: Block, stream: BytecodeStream, predicate: string): void;
        emitIfNull(block: Block, stream: BytecodeStream, condition: Condition): void;
        emitIfSame(block: Block, stream: BytecodeStream, kind: Kind, condition: Condition): void;
        emitIfZero(block: Block, stream: BytecodeStream, condition: Condition): void;
        runtimeClass(classInfo: ClassInfo): string;
        runtimeClassObject(classInfo: ClassInfo): string;
        emitClassInitializationCheck(classInfo: ClassInfo): void;
        emitInvoke(methodInfo: MethodInfo, opcode: Bytecodes, nextPC: number): void;
        emitNegativeArraySizeCheck(length: string): void;
        emitBoundsCheck(array: string, index: string): void;
        emitArrayStoreCheck(array: string, value: string): void;
        emitStoreIndexed(kind: Kind): void;
        emitLoadIndexed(kind: Kind): void;
        emitIncrement(stream: BytecodeStream): void;
        emitGoto(block: Block, stream: BytecodeStream): void;
        emitLoadConstant(cpi: number): void;
        emitThrow(pc: number): void;
        emitNewInstance(cpi: number): void;
        emitNewTypeArray(typeCode: number): void;
        emitCheckCast(cpi: number): void;
        emitInstanceOf(cpi: number): void;
        emitArrayLength(): void;
        emitNewObjectArray(cpi: number): void;
        emitNewMultiObjectArray(cpi: number, stream: BytecodeStream): void;
        private emitUnwind;
        emitNoUnwindAssertion(): void;
        emitUndefinedReturnAssertion(): void;
        private emitMonitorEnter;
        private emitPreemptionCheck;
        private emitMonitorExit;
        emitStackOp(opcode: Bytecodes): void;
        emitDivideByZeroCheck(kind: Kind, value: string): void;
        emitArithmeticOp(result: Kind, opcode: Bytecodes, canTrap: boolean): void;
        emitNegateOp(kind: Kind): void;
        emitShiftOp(kind: Kind, opcode: Bytecodes): void;
        emitLogicOp(kind: Kind, opcode: Bytecodes): void;
        emitConvertOp(from: Kind, to: Kind, opcode: Bytecodes): void;
        emitCompareOp(kind: Kind, isLessThan: boolean): void;
        getBlockIndex(pc: number): number;
        getBlock(pc: number): Block;
        emitTableSwitch(block: Block, stream: BytecodeStream): void;
        emitLookupSwitch(block: Block, stream: BytecodeStream): void;
        emitBytecode(stream: BytecodeStream, block: Block): void;
    }
}
declare module J2ME {
    class Emitter {
        writer: IndentingWriter;
        closure: boolean;
        debugInfo: boolean;
        klassHeaderOnly: boolean;
        constructor(writer: IndentingWriter, closure: boolean, debugInfo: boolean, klassHeaderOnly?: boolean);
    }
    enum CompilationTarget {
        Runtime = 0,
        Static = 1
    }
    function emitKlass(emitter: Emitter, classInfo: ClassInfo): void;
    function emitMethodMetaData(emitter: Emitter, methodInfo: MethodInfo, compiledMethodInfo: CompiledMethodInfo): void;
    function emitReferencedSymbols(emitter: Emitter, classInfo: ClassInfo, compiledMethods: CompiledMethodInfo[]): void;
    class CompiledMethodInfo {
        args: string[];
        body: string;
        referencedClasses: ClassInfo[];
        onStackReplacementEntryPoints: number[];
        constructor(args: string[], body: string, referencedClasses: ClassInfo[], onStackReplacementEntryPoints?: number[]);
    }
    function compileMethod(methodInfo: MethodInfo, ctx: Context, target: CompilationTarget): CompiledMethodInfo;
    function compile(jvm: any, jarFiles: Map<string, any>, jarFilter: (jarFile: string) => boolean, classFilter: (classInfo: ClassInfo) => boolean, methodFilterList: string[], fileFilter: string, debugInfo: boolean): void;
}
