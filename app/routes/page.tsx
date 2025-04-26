import RouteVisualizer from 'next-route-visualizer';

export default function RoutesPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Rotas da aplicação</h1>
      <RouteVisualizer />
    </div>
  );
}
