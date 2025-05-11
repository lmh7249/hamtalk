package com.hamtalk;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "spring.profiles.active=prod")
class HamtalkApplicationTests {

    @Test
    void contextLoads() {
    }

}
