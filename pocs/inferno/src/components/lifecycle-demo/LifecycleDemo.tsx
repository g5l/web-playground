import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';

function Timer({ label }: { label: string }) {
  return <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: 4 }}>Active: {label}</div>;
}

Timer.defaultHooks = {
  onComponentWillMount() {
    console.log('[Timer] onComponentWillMount — about to mount');
  },
  onComponentDidMount(domNode: Element) {
    console.log('[Timer] onComponentDidMount — mounted:', domNode.textContent);
  },
  onComponentShouldUpdate(lastProps: any, nextProps: any) {
    console.log('[Timer] onComponentShouldUpdate', { last: lastProps.label, next: nextProps.label });
    return true;
  },
  onComponentWillUpdate(lastProps: any, nextProps: any) {
    console.log('[Timer] onComponentWillUpdate', { last: lastProps.label, next: nextProps.label });
  },
  onComponentDidUpdate(lastProps: any, nextProps: any) {
    console.log('[Timer] onComponentDidUpdate', { last: lastProps.label, next: nextProps.label });
  },
  onComponentWillUnmount(domNode: Element) {
    console.log('[Timer] onComponentWillUnmount — removing:', domNode.textContent);
  },
};

interface LifecycleDemoState {
  count: number;
  visible: boolean;
}

export default class LifecycleDemo extends Component<{}, LifecycleDemoState> {
  state = { count: 0, visible: true };

  render() {
    const { count, visible } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
        <p style={{ margin: 0, fontSize: '0.85em', color: '#888' }}>
          Open the console to see lifecycle logs.
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => this.setState({ count: count + 1 })}>Update ({count})</button>
          <button onClick={() => this.setState({ visible: !visible })}>{visible ? 'Unmount' : 'Mount'}</button>
        </div>

        {visible && <Timer label={`Render #${count}`} />}
      </div>
    );
  }
}
