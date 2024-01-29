import SimpleStorageAbi from './abi/SimpleStorage.json';
import CounterAbi from './abi/Counter.json';
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

export const TestTransaction = () => {
  return <TestWithWaitForWrite />;
};

const TestWithWaitForWrite = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  console.log('hash', hash);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleWriteContract = () => {
    // STORAGE TEST CONTRACT FOR SEPOLIA
    //   const address = '0x0EA43CC454d920e4F43125c06b662D67920fd1aB';
    // writeContract({
    //   address,
    //   abi: SimpleStorageAbi,
    //   functionName: 'setCounter',
    //   args: [1],
    // });
    // STORAGE TEST CONTRACT FOR ARBITRUM SEPOLIA
    const address = '0x2A87ca5e6bc4c48D37a70F83B7ec07ebB0A86f6e';
    writeContract({
      address,
      abi: CounterAbi,
      functionName: 'increment',
      args: [],
    });
  };

  return (
    <>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
      <button onClick={handleWriteContract}>
        {isPending ? 'Confirming...' : 'Store 1'}
      </button>
    </>
  );
};
