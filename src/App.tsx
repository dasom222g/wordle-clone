import React, { FC } from 'react';

const App: FC = () => {
  const message = 'Hollo world!'
  return (
    <div className="text-wordle-green">
      { message }
    </div>
  );
}

export default App;
