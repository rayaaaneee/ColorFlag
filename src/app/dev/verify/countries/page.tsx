import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface VerifyCountriesProps {

}

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

// https://www.npmjs.com/package/react-syntax-highlighter

const VerifyCountries = ({}: VerifyCountriesProps) => {

    return (
        <SyntaxHighlighter language="javascript">
          {exampleCode}
        </SyntaxHighlighter>
    );
};

export default VerifyCountries;