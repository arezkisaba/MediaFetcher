import React, { useState, useEffect } from 'react';
interface TestComponentProps {
    Parameter1: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ Parameter1 }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const renderModalType = (): JSX.Element => {
        return <></>;
      };

  return (
    <div>
    </div>
  );
};

export default TestComponent;