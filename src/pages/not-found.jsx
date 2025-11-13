import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! Page not exists.</p>
      <Link to="/" style={styles.link}>
        Homepage
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '8rem 2rem',
    color: '#fff',
  },
  title: {
    fontSize: '7.2rem',
    marginBottom: '2rem',
  },
  message: {
    fontSize: '1.8rem',
    marginBottom: '3rem',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
};

export default NotFoundPage;
