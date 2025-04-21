import React from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Color {
  id: number;
  name: string;
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    const newParamValues = [...this.state.paramValues];
    const existingValueIndex = newParamValues.findIndex(pv => pv.paramId === paramId);

    if (existingValueIndex !== -1) {
      newParamValues[existingValueIndex] = { paramId, value };
    } else {
      newParamValues.push({ paramId, value });
    }

    this.setState({ paramValues: newParamValues });
  };

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues
    };
  }

  render() {
    return (
      <div className="param-editor">
        {this.props.params.map(param => {
          const value = this.state.paramValues.find(pv => pv.paramId === param.id)?.value || '';
          
          return (
            <div key={param.id} className="param-row">
              <label>{param.name}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => this.handleParamChange(param.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

// Пример использования
const App: React.FC = () => {
  const params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: "string"
    },
    {
      id: 2,
      name: "Длина",
      type: "string"
    }
  ];

  const initialModel: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное"
      },
      {
        paramId: 2,
        value: "макси"
      }
    ],
    colors: []
  };

  const editorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      console.log('Current model:', model);
    }
  };

  return (
    <div className="app">
      <ParamEditor ref={editorRef} params={params} model={initialModel} />
      <button onClick={handleGetModel}>Получить модель</button>
    </div>
  );
};

export default App;
