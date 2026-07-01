import { Redirect } from 'expo-router';

export default function Index() {
  // By default, redirect to onboarding/welcome flow
  return <Redirect href="/(auth)/onboarding" />;
}
