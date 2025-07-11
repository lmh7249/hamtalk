package com.hamtalk.chat.config.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueryDslConfig {
    /* 기존 JPQL 사용 시, 해당 설정을 안한 이유
       - @Query("SELECT ...") 쿼리 문자열 작성 했을 때,
            -> Spring Data JPA가 자동으로 EntityManager를 사용해서 문자열 실행했기 때문.
       QueryDSL은 우리가 직접 자바 코드로 쿼리를 조립해야 함
            -> 조립의 주체가 되는 JPAQueryFactory가 명시적으로 필요함.
     */

    /*
        EntityManager
        - JPA의 가장 핵심적인 부품(DB 총괄 매니저)
        - DB와의 모든 실제 통신(CRUD)을 책임짐.
        - 이 매니저가 없으면 DB와 대화 불가.
        @PersistenceContext -> EntityManager를 데려와 달라고 요청하는 어노테이션
     */
    @PersistenceContext
    private EntityManager entityManager;

    /*
        JPAQueryFactory
        - 개발자가 실제로 사용하게 될 "쿼리 조립 기계"
        - 개발자가 select(), .from(), .where() 같은 자바 코드 작성하면
          -> JPAQueryFactory -> EntityManager에게 전달해주는 역할
    * */
    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        //  메서드가 반환하는 객체를 Bean으로 등록
        return new JPAQueryFactory(entityManager);
    }
}
